const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding remote database...");

  // Find or create a default broker
  let broker = await prisma.broker.findFirst();
  if (!broker) {
    console.log("No broker found, creating default broker...");
    broker = await prisma.broker.create({
      data: {
        name: "Ricardo Mendes",
        email: "testbroker@example.com",
        passwordHash: "$2b$10$xyz...", // mock hash
        phone: "11999999999",
        document: "CRECI-12345-F",
        license: "CRECI-12345",
        avatarUrl: null
      }
    });
  }
  
  console.log(`Using broker: ${broker.name} (${broker.id})`);

  // Clear existing properties/leads to avoid duplicates during seeding if desired, or just create them
  const countProps = await prisma.property.count({ where: { brokerId: broker.id } });
  if (countProps === 0) {
    console.log("Seeding properties...");
    await prisma.property.createMany({
      data: [
        {
          title: "Cobertura Duplex nos Jardins",
          description: "Sofisticada cobertura com vista panorâmica para a cidade, piscina privativa, 3 suítes amplas, varanda gourmet e automação residencial completa.",
          type: "APARTMENT",
          status: "AVAILABLE",
          price: 2450000.00,
          area: 280,
          bedrooms: 3,
          bathrooms: 4,
          parkingSpots: 3,
          address: "Alameda Lorena, 1420",
          city: "São Paulo",
          state: "SP",
          zipCode: "01424-001",
          features: ["Piscina", "Gourmet", "Automação", "Segurança"],
          brokerId: broker.id
        },
        {
          title: "Casa de Luxo em Condomínio - Alphaville",
          description: "Ampla residência com arquitetura moderna, pé direito duplo, adega climatizada, piscina com borda infinita e acabamentos importados.",
          type: "HOUSE",
          status: "AVAILABLE",
          price: 3800000.00,
          area: 450,
          bedrooms: 4,
          bathrooms: 5,
          parkingSpots: 4,
          address: "Alameda dos Pinheiros, 45",
          city: "Barueri",
          state: "SP",
          zipCode: "06474-000",
          features: ["Borda Infinita", "Adega", "Condomínio", "Portaria 24h"],
          brokerId: broker.id
        },
        {
          title: "Loft Industrial Decorado em Pinheiros",
          description: "Estilo nova-iorquino totalmente mobiliado e decorado por arquiteto renomado. Pé direito alto, tijolos aparentes e excelente iluminação natural.",
          type: "APARTMENT",
          status: "AVAILABLE",
          price: 980000.00,
          area: 85,
          bedrooms: 1,
          bathrooms: 2,
          parkingSpots: 1,
          address: "Rua Simão Álvares, 720",
          city: "São Paulo",
          state: "SP",
          zipCode: "05417-020",
          features: ["Mobiliado", "Decoração", "Portaria Virtual"],
          brokerId: broker.id
        },
        {
          title: "Studio Moderno Próximo ao Metrô Itaim",
          description: "Ideal para investidores ou moradia prática. Prédio novo com lazer de clube no rooftop, academia profissional e coworking integrado.",
          type: "OTHER",
          status: "AVAILABLE",
          price: 580000.00,
          area: 38,
          bedrooms: 1,
          bathrooms: 1,
          parkingSpots: 1,
          address: "Rua João Cachoeira, 310",
          city: "São Paulo",
          state: "SP",
          zipCode: "04535-001",
          features: ["Rooftop", "Academia", "Coworking", "Lazer Completo"],
          brokerId: broker.id
        },
        {
          title: "Terreno Plano para Incorporação Comercial",
          description: "Excelente localização na zona sul, ideal para comércio de rua, clínicas ou galpão logístico de pequeno porte.",
          type: "LAND",
          status: "AVAILABLE",
          price: 1850000.00,
          area: 600,
          bedrooms: 0,
          bathrooms: 0,
          parkingSpots: 0,
          address: "Avenida Santo Amaro, 2450",
          city: "São Paulo",
          state: "SP",
          zipCode: "04556-200",
          features: ["Plano", "Comercial", "Esquina"],
          brokerId: broker.id
        }
      ]
    });
    console.log("Properties seeded successfully!");
  } else {
    console.log("Properties already seeded.");
  }

  // Seed Leads
  const countLeads = await prisma.lead.count({ where: { brokerId: broker.id } });
  if (countLeads === 0) {
    console.log("Seeding leads...");
    await prisma.lead.createMany({
      data: [
        {
          name: "Carlos Eduardo Souza",
          email: "carlos.eduardo@gmail.com",
          phone: "11988887777",
          budgetMin: 800000.00,
          budgetMax: 1200000.00,
          locationInterest: "Pinheiros",
          propertyTypePref: ["APARTMENT"],
          stage: "IN_PROGRESS",
          brokerId: broker.id
        },
        {
          name: "Mariana Costa Silva",
          email: "mariana.costa@hotmail.com",
          phone: "11977776666",
          budgetMin: 2000000.00,
          budgetMax: 3000000.00,
          locationInterest: "Jardins",
          propertyTypePref: ["APARTMENT", "HOUSE"],
          stage: "VISIT_SCHEDULED",
          brokerId: broker.id
        },
        {
          name: "Felipe Albuquerque",
          email: "felipe.albu@outlook.com",
          phone: "11966665555",
          budgetMin: 500000.00,
          budgetMax: 650000.00,
          locationInterest: "Itaim Bibi",
          propertyTypePref: ["APARTMENT", "OTHER"],
          stage: "NEW",
          brokerId: broker.id
        }
      ]
    });
    console.log("Leads seeded successfully!");
  } else {
    console.log("Leads already seeded.");
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
