import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Semillas para empleados
  await prisma.employee.createMany({
    data: [
      {
        first_name: 'Marleny',
        last_name: 'Echeverria',
        email: 'marleny@email.com',
        pin: 1234,
        role: 'ADMIN',
      },
    ],
    skipDuplicates: true,
  });
}

// Semillas para productos
//   await prisma.product.createMany({
//     data: [
//       {
//         name: 'Crema facial hidratante',
//         description: 'Crema hidratante para todo tipo de piel.',
//         price: 15.99,
//         cost: 8.0,
//       },
//       {
//         name: 'Champú revitalizante',
//         description: 'Champú con vitaminas para fortalecer el cabello.',
//         price: 9.5,
//         cost: 4.0,
//       },
//       {
//         name: 'Mascarilla nutritiva',
//         description: 'Mascarilla para nutrir y reparar el cabello.',
//         price: 12.75,
//         cost: 6.0,
//       },
//       {
//         name: 'Esmalte de uñas',
//         description: 'Esmalte de uñas de larga duración.',
//         price: 5.0,
//         cost: 2.0,
//       },
//       // Agrega más productos según sea necesario
//     ],
//     skipDuplicates: true,
//   });

//   // Semillas para servicios
//   await prisma.service.createMany({
//     data: [
//       {
//         name: 'Masaje relajante',
//         description: 'Masaje corporal completo de 60 minutos.',
//         price: 50.0,
//         cost: 25.0,
//       },
//       {
//         name: 'Manicura completa',
//         description: 'Manicura con esmaltado permanente.',
//         price: 20.0,
//         cost: 10.0,
//       },
//       {
//         name: 'Pedicura spa',
//         description: 'Pedicura con exfoliación y masaje.',
//         price: 25.0,
//         cost: 12.0,
//       },
//       {
//         name: 'Corte de cabello',
//         description: 'Corte de cabello personalizado.',
//         price: 18.0,
//         cost: 9.0,
//       },
//       // Agrega más servicios según sea necesario
//     ],
//     skipDuplicates: true,
//   });
// }

// TODO: Semillas para las Categorias y Subcategorias

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
