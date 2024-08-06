import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/db/db";
import { formatNumber } from "@/lib/formatter";

async function getSalesData() {
  const data = await prisma.order.aggregate({
    _count: true
  })
  return {numSale: data._count }
}

async function getUserData() {
  const data = await prisma.user.count()

  return {numUser: data }
}

async function getProductData() {
  const data = await prisma.product.count()

  return {numProduct: data }
}

export default async function AdminDashboard() {
  const salesData = await getSalesData()
  const userData = await getUserData()
  const productData = await getProductData()

  return <div className="grid grid-cols1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <DashBoardCard title="Total Products" subtitle="" body={formatNumber(productData.numProduct)} />
    <DashBoardCard title="Total Orders" subtitle="This month" body={formatNumber(salesData.numSale)} />
    <DashBoardCard title="Total Customers" subtitle="" body={formatNumber(userData.numUser)} />
  </div>
}

type DashBoardCardProps = {
  title: string;
  subtitle: string;
  body: string;
}

function DashBoardCard({title, subtitle, body}: DashBoardCardProps) {
  return <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{subtitle}</CardDescription>
    </CardHeader>
    <CardContent><p>{body}</p></CardContent>
  </Card>
}