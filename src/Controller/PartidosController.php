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
    #[Route('/', name: 'app_partidos_index', methods: ['GET', 'POST'])]
    public function index(Request $request, PartidosRepository $partidosRepository, EntityManagerInterface $entityManager): Response
    {
        // Obtener todos los partidos
        $partidos = $partidosRepository->findAll();
        $partidosVisitante = $partidosRepository->findPartidosByVisitanteSQL('River');
    
        // Si se recibe un formulario POST, actualizar la puntuación del partido
        if ($request->isMethod('POST')) {
            $partidoId = $request->request->get('partido_id');
            $rating = $request->request->get('rating');
    
            $partido = $partidosRepository->find($partidoId);
            if ($partido) {
                $partido->setRating($rating);
                $entityManager->flush();
            }
        }
    
        // Obtener el número total de partidos
        $totalPartidos = count($partidos);
    
        // Obtener el último partido
        $ultimoPartido = null;
        if ($totalPartidos > 0) {
            $ultimoPartido = $partidosRepository->findOneBy([], ['fecha' => 'DESC']);
        }
    
        // Obtener partidos agrupados por mes y año
        $partidosPorMesYAnio = $partidosRepository->findPartidosGroupedByMonthAndYear();
    
        return $this->render('partidos/index.html.twig', [
            'partidos' => $partidos,
            'totalPartidos' => $totalPartidos,
            'ultimoPartido' => $ultimoPartido,
            'partidosVisitante' => $partidosVisitante,
            'partidosPorMesYAnio' => $partidosPorMesYAnio,
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
