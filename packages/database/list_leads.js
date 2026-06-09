const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const brokers = await prisma.broker.findMany();
  console.log("Brokers in database:");
  brokers.forEach(b => console.log(`- ${b.name} (${b.id}) - ${b.email}`));

  const leads = await prisma.lead.findMany();
  console.log("\nLeads in database:");
  leads.forEach(l => console.log(`- ${l.name} (${l.id}) assigned to broker ${l.brokerId}`));
}

main().finally(() => prisma.$disconnect());
