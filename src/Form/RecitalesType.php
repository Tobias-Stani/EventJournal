<?php

namespace App\Form;

use App\Entity\Recitales;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class RecitalesType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('banda', TextType::class, [
                'label' => 'Banda',
                'attr' => ['class' => 'form-control']
            ])
            ->add('fecha', DateType::class, [
                'label' => 'Fecha',
                'widget' => 'single_text',
                'attr' => ['class' => 'form-control']
            ])
            ->add('lugar', TextType::class, [
                'label' => 'Lugar',
                'attr' => ['class' => 'form-control']
            ])
            ->add('setList', TextType::class, [
                'label' => 'SetList',
                'attr' => ['class' => 'form-control']
            ])
            ->add('observacion', TextareaType::class, [
                'label' => 'Observación',
                'required' => false,
                'attr' => [
                    'class' => 'form-control',
                    'rows' => 5
                ]
            ])
            ->add('rate', ChoiceType::class, [
                'label' => 'Rate',
                'choices' => [
                    '1' => 1,
                    '2' => 2,
                    '3' => 3,
                    '4' => 4,
                    '5' => 5,
                ],
                'expanded' => true,
                'multiple' => false,
                'attr' => ['class' => 'form-control']
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Recitales::class,
        ]);
    }
}
