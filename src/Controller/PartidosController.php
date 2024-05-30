<?php

// src/Controller/PartidosController.php
namespace App\Controller;

use App\Entity\Partidos;
use App\Form\PartidosType;
use App\Repository\PartidosRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/partidos')]
class PartidosController extends AbstractController
{
    #[Route('/', name: 'app_partidos_index', methods: ['GET'])]
    public function index(PartidosRepository $partidosRepository): Response
    {
        $partidos = $partidosRepository->findAll();
        $totalPartidos = count($partidos);
        $partidosVisitante = $partidosRepository->findPartidosByVisitanteSQL('River');

        // Obtener el último partido
        $ultimoPartido = null;
        if ($totalPartidos > 0) {
            $ultimoPartido = $partidosRepository->findOneBy([], ['fecha' => 'DESC']);
        }

        return $this->render('partidos/index.html.twig', [
            'partidos' => $partidos,
            'totalPartidos' => $totalPartidos,
            'ultimoPartido' => $ultimoPartido,
            'partidosVisitante' => $partidosVisitante,
        ]);
    }

    #[Route('/new', name: 'app_partidos_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $partido = new Partidos();
        $form = $this->createForm(PartidosType::class, $partido);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($partido);
            $entityManager->flush();

            return $this->redirectToRoute('app_partidos_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('partidos/new.html.twig', [
            'partido' => $partido,
            'form' => $form->createView(),
        ]);
    }

    #[Route('/{id}', name: 'app_partidos_show', methods: ['GET'])]
    public function show(Partidos $partido): Response
    {
        return $this->render('partidos/show.html.twig', [
            'partido' => $partido,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_partidos_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Partidos $partido, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(PartidosType::class, $partido);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_partidos_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('partidos/edit.html.twig', [
            'partido' => $partido,
            'form' => $form->createView(),
        ]);
    }

    #[Route('/{id}', name: 'app_partidos_delete', methods: ['POST'])]
    public function delete(Request $request, Partidos $partido, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$partido->getId(), $request->request->get('_token'))) {
            $entityManager->remove($partido);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_partidos_index', [], Response::HTTP_SEE_OTHER);
    }
}
