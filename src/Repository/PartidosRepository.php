<?php

// src/Repository/PartidosRepository.php
namespace App\Repository;

use App\Entity\Partidos;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class PartidosRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Partidos::class);
    }

    public function findPartidosByVisitanteSQL($equipoVisitante)
    {
        $entityManager = $this->getEntityManager();

        $query = $entityManager->createQuery(
            'SELECT p
            FROM App\Entity\Partidos p
            WHERE p.visitante = :visitante'
        )->setParameter('visitante', $equipoVisitante);

        return $query->getResult();
    }
}
