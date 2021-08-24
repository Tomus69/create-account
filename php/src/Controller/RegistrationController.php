<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationFormType;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class RegistrationController extends AbstractController
{
    #[Route('/register', name: 'app_register')]
    public function register(
        Request $request,
        UserPasswordHasherInterface $passwordEncoder,
        UserRepository $userRepository
    ): Response
    {
        $user = new User();
        $status = 400;
        $request->request->add(
            ['registration_form' => json_decode(
                $request->getContent(),
                true)]
        );
        $form = $this->createForm(RegistrationFormType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            try {
                $userRepository->upgradePassword(
                    $user,
                    $passwordEncoder->hashPassword(
                        $user,
                        $form->get('password')->getData()
                    )
                );
                $status = 201;
            }catch (\Throwable $th) {
                $status = 500;
            }
        }

        return $this->json(
            $user,
            $status,
            array(),
            ['groups' => array('user')]
        );
    }
}
