<?php

namespace App\Form;

use App\Entity\Role;
use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {

        $isEmpty = $builder->getData()->getEmail();

        $builder
            ->add('email', TextType::class, [
                'label' => 'Email:',
                'attr' => [
                    'class' => 'form-control',
                    'readonly' => !empty($isEmpty),
                ],
                'constraints' => [
                    new NotBlank(),
                ]
            ])
            ->add('password', PasswordType::class, [
                'attr' => [
                    'class' => 'form-control',
                ],
                'constraints' => [
                    new NotBlank([
                        'message' => 'Please enter a password',
                    ]),
                    new Length([
                        'min' => 6,
                        'minMessage' => 'Your password should be at least {{ limit }} characters',
                        // max length allowed by Symfony for security reasons
                        'max' => 4096,
                    ]),
                ],
            ])
            ->add('role', EntityType::class, [
                'class' => Role::class,
                'choice_label' => 'name',
                'label' => 'Rol:',
                'attr' => [
                    'class' => 'form-control',
                ],
            ])
            ->add('active', ChoiceType::class, [
                'choices'  => [
                    'Activo' => 1,
                    'Inactivo' => 0
                ],
                'label' => 'Estado:',
                'attr' => [
                    'class' => 'form-control',
                    'style' => 'font-weight: bold'
                ],
            ])
            ->add('guardar', SubmitType::class, [
                'label' => 'Guardar',
                'attr' => [
                    'class' => 'btn btn-primary font-bold',
                ]
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
