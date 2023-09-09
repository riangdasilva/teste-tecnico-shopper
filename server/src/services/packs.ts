import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const serializePack = (pack: PackInDB) => {
  return {
    code: Number(pack.product_id),
    qty: Number(pack.qty),
  }
}

const readPackByProductCode = async (code: number) => {
  const packs = await prisma.packs.findMany({
    where: {
      pack_id: code,
    },
  })
  if (!packs) return
  return packs.map((pack) => serializePack(pack))
}

export default {
  readPackByProductCode,
}
