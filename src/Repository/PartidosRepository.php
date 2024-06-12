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

    public function findPartidosGroupedByMonthAndYear(): array
    {
        $conn = $this->getEntityManager()->getConnection();

        $sql = '
            SELECT YEAR(p.fecha) as year, MONTH(p.fecha) as month, COUNT(p.id) as partidoCount
            FROM partidos p
            GROUP BY year, month
            ORDER BY year ASC, month ASC
        ';
        $stmt = $conn->executeQuery($sql);

        return $stmt->fetchAllAssociative();
    }

    public function findDistinctYearsList()
    {
        $conn = $this->getEntityManager()->getConnection();

        $sql = '
            SELECT DISTINCT YEAR(p.fecha) as year
            FROM partidos p
            ORDER BY year DESC
        ';
        $stmt = $conn->executeQuery($sql);

        return $stmt->fetchAllAssociative();
    }
}
