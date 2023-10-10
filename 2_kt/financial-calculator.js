class FinancialCalculator extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
<div>
  <h1>Финансовый калькулятор</h1>
  <form id="calculator-form">
    <label for="loanAmount">Сумма кредита:</label>
    <input type="text" id="loanAmount" name="loanAmount" required>
    
    <label for="interestRate">Процентная ставка:</label>
    <input type="text" id="interestRate" name="interestRate" required>
    
    <label for="loanTerm">Срок кредита (в месяцах):</label>
    <input type="text" id="loanTerm" name="loanTerm" required>

    <button type="submit">Рассчитать</button>
  </form>

  <div id="results"></div>
</div>
`;
        this.shadowRoot.querySelector('form').addEventListener('submit', this.handleFormSubmit.bind(this));
    }

    handleFormSubmit(e) {
        e.preventDefault();

        const loanAmount = parseFloat(this.shadowRoot.querySelector('#loanAmount').value);
        const interestRate = parseFloat(this.shadowRoot.querySelector('#interestRate').value);
        const loanTerm = parseInt(this.shadowRoot.querySelector('#loanTerm').value);

        const monthlyPayment = this.calculateMonthlyPayment(loanAmount, interestRate, loanTerm);
        const totalPayment = this.calculateTotalPayment(monthlyPayment, loanTerm);
        const totalInterest = this.calculateTotalInterest(totalPayment, loanAmount);

        this.displayResults(monthlyPayment, totalPayment, totalInterest);
    }

    calculateMonthlyPayment(loanAmount, interestRate, loanTerm) {
        const monthlyInterestRate = interestRate / 12 / 100;
        const numberOfPayments = loanTerm * 12;
        const denominator = Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1;
        const monthlyPayment = (loanAmount * monthlyInterestRate) / denominator;
        return monthlyPayment.toFixed(2);
    }

    calculateTotalPayment(monthlyPayment, loanTerm) {
        const numberOfPayments = loanTerm * 12;
        const totalPayment = monthlyPayment * numberOfPayments;
        return totalPayment.toFixed(2);
    }

    calculateTotalInterest(totalPayment, loanAmount) {
        const totalInterest = totalPayment - loanAmount;
        return totalInterest.toFixed(2);
    }

    displayResults(monthlyPayment, totalPayment, totalInterest) {
        const resultContainer = this.shadowRoot.querySelector('#results');
        resultContainer.innerHTML = `
<p>Ежемесячный платеж: $${monthlyPayment}</p>
<p>Общая сумма к оплате: $${totalPayment}</p>
<p>Общий процент по кредиту: $${totalInterest}</p>
`;
    }

    connectedCallback() {
        console.log('Компонент создан');
    }

    disconnectedCallback() {
        console.log('Компонент удален');
    }
}

customElements.define('financial-calculator', FinancialCalculator);