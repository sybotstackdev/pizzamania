import PizzaDetails from '@/components/PizzaDetails'

export default function PizzaDetailPage({ params }: { params: { id: string } }) {
  return <PizzaDetails pizzaId={params.id} />
}

