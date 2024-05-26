<?php

namespace App\Entity;

use App\Repository\PartidosRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PartidosRepository::class)]
class Partidos
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $local = null;

    #[ORM\Column(length: 255)]
    private ?string $visitante = null;

    #[ORM\Column(nullable: true)]
    private ?int $golLocal = null;

    #[ORM\Column(nullable: true)]
    private ?int $golVisitante = null;

    #[ORM\Column(length: 255)]
    private ?string $estadio = null;

    #[ORM\Column(length: 255)]
    private ?string $competencia = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $fecha = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $link = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLocal(): ?string
    {
        return $this->local;
    }

    public function setLocal(string $local): static
    {
        $this->local = $local;

        return $this;
    }

    public function getVisitante(): ?string
    {
        return $this->visitante;
    }

    public function setVisitante(string $visitante): static
    {
        $this->visitante = $visitante;

        return $this;
    }

    public function getGolLocal(): ?int
    {
        return $this->golLocal;
    }

    public function setGolLocal(?int $golLocal): static
    {
        $this->golLocal = $golLocal;

        return $this;
    }

    public function getGolVisitante(): ?int
    {
        return $this->golVisitante;
    }

    public function setGolVisitante(?int $golVisitante): static
    {
        $this->golVisitante = $golVisitante;

        return $this;
    }

    public function getEstadio(): ?string
    {
        return $this->estadio;
    }

    public function setEstadio(string $estadio): static
    {
        $this->estadio = $estadio;

        return $this;
    }

    public function getCompetencia(): ?string
    {
        return $this->competencia;
    }

    public function setCompetencia(string $competencia): static
    {
        $this->competencia = $competencia;

        return $this;
    }

    public function getFecha(): ?\DateTimeInterface
    {
        return $this->fecha;
    }

    public function setFecha(\DateTimeInterface $fecha): static
    {
        $this->fecha = $fecha;

        return $this;
    }

    public function getLink(): ?string
    {
        return $this->link;
    }

    public function setLink(?string $link): static
    {
        $this->link = $link;

        return $this;
    }
}
