<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\IsTrue;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;

class RegistrationFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('email', EmailType::class, array(
                'attr' => array(
                    'placeholder' => 'Email',
                    'class'=>'form-control'
                ))
            )
/*             ->add('agreeTerms', CheckboxType::class, [
                'mapped' => false,
                'constraints' => [
                    new IsTrue([
                        'message' => 'You should agree to our terms.',
                    ]),
                ],
            ]) */
            ->add('plainPassword', RepeatedType::class,[
                'type' => PasswordType::class,
                'mapped' => false,
                'invalid_message' => 'Las contraseñas deben coincidir.',
                //'help' => '* La contraseña debe contener como mínimo 6 caracteres y máximo 12 caracteres.',
                'constraints' => [
                    new Length([
                        'min' => 6,
                        'max' => 12,
                        'minMessage' => 'Debe contener como mínimo {{ limit }} caracteres.',
                        'maxMessage' => 'Debe contener como máximo {{ limit }} caracteres.'
                    ]),
                ],
                'options' => [
                    'attr' => ['class' => 'onkey form-control password-field', 'autocomplete'=> 'off','minlength' => 6 , 'maxlength' => 12]
                ],
                'required' => true,
                'first_options' => [
                    'attr' => [
                        'placeholder' => 'Contraseña',
                        'class'=>'onkey form-control',
                        'minlength' => 6 ,
                        'maxlength' => 12
                    ]
        ],
                'second_options' => [
                    'attr' => [
                        'placeholder' => 'Repita la contraseña',
                        'class'=>'onkey form-control',
                        'minlength' => 6 ,
                        'maxlength' => 12
                    ]
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
