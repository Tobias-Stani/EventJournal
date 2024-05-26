<?php

namespace App\Entity;

use App\Repository\ConfigurationRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ConfigurationRepository::class)]
class Configuration
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?bool $siteStatus = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function isSiteStatus(): ?bool
    {
        return $this->siteStatus;
    }

    public function setSiteStatus(bool $siteStatus): static
    {
        $this->siteStatus = $siteStatus;

        return $this;
    }
}
