const loanForm = document.querySelector('#loan-form')
const results = document.querySelector('#results')
const loading = document.querySelector('#loading')

loanForm.addEventListener('submit', (e) => {

    results.style.display = 'none'

    loading.style.display = 'block'

    setTimeout(calculateLoan, 2000);

    e.preventDefault()

})


function calculateLoan() {
    
    const amount = document.querySelector('#amount')
    const interest = document.querySelector('#interest')
    const years = document.querySelector('#years')
    const monthlyPayment = document.querySelector('#monthly-payment')
    const totalPayment = document.querySelector('#total-payment')
    const totalInterest = document.querySelector('#total-interest')

    const principal = parseFloat(amount.value)
    const calculatedInterest = parseFloat(interest.value) / 100 / 12
    const calculatedPayments = parseFloat(years.value) * 12

    const x = Math.pow(1 + calculatedInterest, calculatedPayments)
    const monthly = (principal * x * calculatedInterest) / (x - 1)

    if (isFinite(monthly)) {

        monthlyPayment.value = monthly.toFixed(2)

        totalPayment.value = (monthly * calculatedPayments).toFixed(2)

        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2)

        results.style.display = 'block'

        loading.style.display = 'none'

    } else {

        
        showError('Please check your numbers')

        loading.style.display = 'none'
    }

}

function showError(error) {

    const errorDiv = document.createElement('div')
    const card = document.querySelector('.card')
    const heading = document.querySelector('.heading')

    errorDiv.className = 'alert alert-danger'

    errorDiv.appendChild(document.createTextNode(error))

    card.insertBefore(errorDiv, heading)

    setTimeout(() => {
        document.querySelector('.alert').remove()
    }, 3000);



}