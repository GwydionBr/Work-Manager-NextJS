interface ListTotalMoneyAndTimeProps {
  totalMoney: number;
  totalTime: number;
}

export default function ListTotalMoneyAndTime({totalMoney, totalTime}: ListTotalMoneyAndTimeProps) {
  return (
    <div className="rounded shadow bg-lime-200 p-5"> 
      <div className="flex flex-col gap-5 mt-5 items-center">
        <div>
          <h3 className="text-sm font-semibold pb-3 underline">Total Money Earned</h3>
          <p className="text-lg font-semibold text-center">{totalMoney} $</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-center pb-3 underline">Total Time Spent</h3>
          <div className="flex gap-5">
            <p className="text-lg font-semibold">Hours: {Math.floor(totalTime/60)}</p>
            <p className="text-lg font-semibold">Minutes: {totalTime%60}</p>
          </div>
        </div>
      </div>
    </div>
  );
}