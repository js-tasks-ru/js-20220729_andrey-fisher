export default class ColumnChart {
  cBody = {};
  element = {};

  constructor({
    data = [],
    label = "",
    link = "",
    value = 0,
    formatHeading = data => data,
  } = {}) {
    this.data = data;
    this.label = label;
    this.value = value;
    this.link = link;
    this.formatHeading = formatHeading;
    this.chartHeight = 50;

    this.render();
  }
  
  get template() {
    return `
      <div class="column-chart column-chart_loading" style="--chart-height: ${ this.chartHeight }">
        <div class="column-chart__title">
          Total ${this.label}
          ${this.getLink()}
        </div>
        <div class="column-chart__container">
           <div data-element="header" class="column-chart__header">
             ${this.getValue()}
           </div>
          <div data-element="body" class="column-chart__chart">
            ${this.getColumnBody()}
          </div>
        </div>
      </div>
    `;
  }

  getLink() {
    return this.link
      ? `<a class="column-chart__link" href="${this.link}">View all</a>`
      : '';
  }  
  
  getValue() {
    return this.formatHeading ? this.formatHeading(this.value.toLocaleString('en-US')) : this.value.toLocaleString('en-US');
  }

  getColumnBody() {
    if (!this.data || !this.data.length) {
      return;
    }
    
    const maxValue = Math.max(...this.data);
    const scaleValue = this.chartHeight / maxValue;
    const scalePercent = 100 / maxValue;

    return this.data
      .map(item => {
        return `<div style="--value: ${Math.floor(item * scaleValue)}" data-tooltip="${Math.round(item * scalePercent)}%"></div>`;
      })
      .join("");
  }
  
  render() {
    const main = document.createElement('div');
    main.innerHTML = this.template;
    this.element = main.firstElementChild;

    if (this.data && this.data.length) {
      this.element.classList.remove("column-chart_loading");
    }

    this.element = main.firstElementChild;

    this.cBody = this.element.querySelectorAll("[data-element='body']")[0];
  }

  update(newData = []) {
    if (!this.data.length) {
      this.element.classList.add("column-chart_loading");
    }

    this.data = newData;

    this.cBody.innerHTML = this.getColumnBody();
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    this.element = null;
    this.cBody = null;
  }
}
