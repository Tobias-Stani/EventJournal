<?php

namespace App\Controller;

use App\Entity\Configuration;
use App\Form\ConfigurationType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class ConfigurationController extends AbstractController
{
    #[Route('/configuration', name: 'app_configuration')]
    public function index(Request $request, EntityManagerInterface $em): Response
    {

        $configuration = $em->getRepository(Configuration::class)->find(1);

        $form = $this->createForm(ConfigurationType::class, $configuration);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em->persist($configuration);
            $em->flush();

            return $this->redirectToRoute('app_configuration', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('configuration/index.html.twig', [
            'configuration' => $configuration,
            'form' => $form->createView(),
        ]);
    }

}
