function checkCashRegister(price, cash, cid) {
  let change = cash - price; //setup change due

  //setup basic currency list
  let currency = {'PENNY':0.01, 'NICKEL':0.05,'DIME':0.1,'QUARTER':0.25,'ONE':1,'FIVE':5,'TEN':10,'TWENTY':20,'ONE HUNDRED':100};

  //solution of b: change due = total cash
  if (cid.reduce((sum,element)=>sum+element[1],0) === change)
    {return {status: "CLOSED", change: cid};}
  //

  //solution of ai: total cash < change due
  else if (cid.reduce((sum,element)=>sum+element[1],0) < change)
  {return {status: "INSUFFICIENT_FUNDS", change: []};}
  //
  
  //solution of aii & c
  else {
          let bill = cid.filter(element=>element[1] > 0 && currency[element[0]] <= change); //array containing only existing bill with face value less than change due

          let remval = change; //to be used in the loop
          let changeobj = {}; //to push the required answer into it

          //method to get the desired answer
          for (let j = bill.length -1; j >= 0; j--) //from highest to lowest
              {
                let i; //use to represent quantity needed of each bill/coin
                let facevalue = currency[bill[j][0]]; //the facevalue of each bill.coin
                let iquantity = bill[j][1] / facevalue; //how many bill/coin we have respectively

                for (i = 1; i * facevalue <= remval && i <= iquantity; i++) // to get which bill needed and its total value
                    {
                      changeobj[bill[j][0]] = i * facevalue;
                    }

                remval -= (i - 1) * facevalue; // to get a new remval for next loop
                remval = Math.round(remval*100) / 100; //to resolve java calculation decimal error
              }
          
          //to distinguish between solution c & aii
          if (remval > 0) {return {status: "INSUFFICIENT_FUNDS", change: []};} //solution of aii

              else { //solution of c
                      let billnamearr = Object.keys(changeobj); // to get the name & length for next loop
                      let changearr = []; // to put the answer in

                      for (let k = 0; k < billnamearr.length; k++) //make the changearr the format required
                          {
                            let temparr = [billnamearr[k],changeobj[billnamearr[k]]];
                            changearr.push(temparr);
                          }
                      
                      return {status: "OPEN", change: changearr}; //return the answer
                   }
       }
  //
}