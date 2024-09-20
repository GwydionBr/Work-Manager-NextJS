import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


interface ListTotalMoneyAndTimeProps {
  totalMoney: number;
  totalTime: number;
}

export default function ListTotalMoneyAndTime({totalMoney, totalTime}: ListTotalMoneyAndTimeProps) {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Total Money Earned</CardTitle>
        <CardDescription>{totalMoney} $</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <CardTitle>Total Time Spent</CardTitle>
        <div className="flex justify-center gap-4 pt-4">
          <CardDescription>Hours: {Math.floor(totalTime/60)}</CardDescription>
          <CardDescription>Minutes: {totalTime%60}</CardDescription>
        </div>
      </CardContent>
    </Card>
  );
}