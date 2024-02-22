function btnEnable(btn){
    btn.style.backgroundColor= '#1DD100';
    btn.removeAttribute('disabled');
}

function discountCalculation(discount){
    const discountRow= document.createElement('div');
    discountRow.setAttribute('class', 'flex flex-row justify-between items-center px-4 h-8 card');
    discountRow.innerHTML= `
    <h1 class="font-medium">Discount</h1>
    <h1 class="font-medium">BDT -${discount}</h1>`;
    discountAndTotal.appendChild(discountRow);
    grandTotal.innerText= grandTotal.innerText- discount;
    document.getElementById('input-field').style.display='none';
}


const nextBtn= document.getElementById('next-btn');

let intSeatNumber= 0;

//get all seat 


const selectedList = document.getElementById('seclected-seat-price-container');
const phoneNumber= document.getElementById('phone-num');
const applyBtn= document.getElementById('apply-btn');
const coupon= document.getElementById('coupon-text');
const grandTotal= document.getElementById('grand-total');
const totalPrice= document.getElementById('total-price');
const discountAndTotal= document.getElementById('discount-and-total');


const allSeat= document.getElementsByClassName('seat-item');
for(const seat of allSeat)
{
    seat.addEventListener("click", function(event){
        if(event.target.style.backgroundColor != 'rgb(29, 209, 0)'){
            if( intSeatNumber < 4){
                event.target.style.backgroundColor='#1DD100';
                event.target.style.color='#fff';


                // add seat to list
                const newSeat = document.createElement('div');
                newSeat.setAttribute('class', 'flex flex-row justify-between items-center px-4 card py-2');
                newSeat.innerHTML = `
                <p>${event.target.innerText}</p>
                <p>Economy</p>
                <p>550</p>`;
                selectedList.appendChild(newSeat);

                intSeatNumber++;
                document.getElementById('seat-number-btn').innerText = intSeatNumber;
                document.getElementById('left-seat').innerText = 40 - intSeatNumber;
                totalPrice.innerText= 550* intSeatNumber;
                grandTotal.innerText= 550* intSeatNumber;

                // apply btn enable
                if(intSeatNumber === 4){
                    btnEnable(applyBtn);
                    coupon.removeAttribute('disabled');
                } 
                // enable next button
                if(phoneNumber.value) btnEnable(nextBtn);
            }
            else document.getElementById('seat-limit-warning').showModal();
        }
        else document.getElementById('multiple-seat-warning').showModal();

    })
}

phoneNumber.addEventListener('keyup', function(){
    if(intSeatNumber >= 1 && phoneNumber.value) btnEnable(nextBtn);
})

applyBtn.addEventListener('click', function(){
    if(coupon.value === 'NEW15')
    {
       const discount= totalPrice.innerText * 0.15;
       discountCalculation(discount);
    }
   else if(coupon.value === 'Couple 20')
    {
       const discount= totalPrice.innerText * 0.20;
       discountCalculation(discount);
    }
    else document.getElementById('invalid-coupon-warning').showModal();

})