<?php

namespace App\Entity;

use App\Repository\RecitalesRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: RecitalesRepository::class)]
class Recitales
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $banda = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $fecha = null;

    #[ORM\Column(length: 255)]
    private ?string $lugar = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $setList = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $observacion = null;

    #[ORM\Column]
    private ?int $rate = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getBanda(): ?string
    {
        return $this->banda;
    }

    public function setBanda(string $banda): static
    {
        $this->banda = $banda;

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

    public function getLugar(): ?string
    {
        return $this->lugar;
    }

    public function setLugar(string $lugar): static
    {
        $this->lugar = $lugar;

        return $this;
    }

    public function getSetList(): ?string
    {
        return $this->setList;
    }

    public function setSetList(?string $setList): static
    {
        $this->setList = $setList;

        return $this;
    }

    public function getObservacion(): ?string
    {
        return $this->observacion;
    }

    public function setObservacion(?string $observacion): static
    {
        $this->observacion = $observacion;

        return $this;
    }

    public function getRate(): ?int
    {
        return $this->rate;
    }

    public function setRate(int $rate): static
    {
        $this->rate = $rate;

        return $this;
    }
}
