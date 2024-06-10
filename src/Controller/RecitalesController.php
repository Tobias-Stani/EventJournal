<?php

namespace App\Controller;

use App\Entity\Recitales;
use App\Form\RecitalesType;
use App\Repository\RecitalesRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/recitales')]
class RecitalesController extends AbstractController
{
    #[Route('/', name: 'app_recitales_index', methods: ['GET'])]
    public function index(RecitalesRepository $recitalesRepository): Response
    {
        return $this->render('recitales/index.html.twig', [
            'recitales' => $recitalesRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_recitales_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $recitale = new Recitales();
        $form = $this->createForm(RecitalesType::class, $recitale);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($recitale);
            $entityManager->flush();

            return $this->redirectToRoute('app_recitales_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('recitales/new.html.twig', [
            'recitale' => $recitale,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_recitales_show', methods: ['GET'])]
    public function show(Recitales $recitale): Response
    {
        return $this->render('recitales/show.html.twig', [
            'recitale' => $recitale,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_recitales_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Recitales $recitale, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(RecitalesType::class, $recitale);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_recitales_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('recitales/edit.html.twig', [
            'recitale' => $recitale,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_recitales_delete', methods: ['POST'])]
    public function delete(Request $request, Recitales $recitale, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$recitale->getId(), $request->getPayload()->get('_token'))) {
            $entityManager->remove($recitale);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_recitales_index', [], Response::HTTP_SEE_OTHER);
    }
}
