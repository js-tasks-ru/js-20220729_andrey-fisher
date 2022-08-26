export default class ColumnChart {
  chartHeight = 50;
  chartBody = {};

  constructor(params) {
    this.data = params.data;
    this.label = params.label;
    this.value = params.value;
    this.link = params.link;
    this.formatHeading = params.formatHeading;

    this.render();
  }

  render() {
    let main = document.createElement('div');
    main.className = "column-chart column-chart_loading";
    main.style.cssText += "--chart-height: 50";
    let title = document.createElement('div');
    title.className = "column-chart__title";
    title.innerText = " Total " + this.label;
    if (this.link) {
      let link = document.createElement('a');
      link.className = "column-chart__link";
      link.href = this.link;
      link.innerText = 'View all';
      title.append(link);
    }
    main.append(title);

    let container = document.createElement('div');
    container.className = "column-chart__container";
    if (this.value) {
      let cHeader = document.createElement('div');
      cHeader.className = "column-chart__header";
      cHeader.setAttribute('data-element', 'header');
      cHeader.textContent = this.formatHeading && this.value ? this.formatHeading(this.value.toLocaleString('en-US')) : this.value.toLocaleString('en-US');
      container.append(cHeader);
    }

    this.chartBody = document.createElement('div');
    this.chartBody.className = "column-chart__chart";
    this.chartBody.setAttribute('data-element', 'body');

    if (this.data && this.data.length !== 0) {
      this.renderData(this.data);
      main.classList.remove('column-chart_loading');
    }
    container.append(this.chartBody);

    main.append(container);

    this.element = main;
  }

  renderData(data) {
    if (!data || !data.length) {
      return;
    }
    const maxValue = Math.max(...data);
    const scaleValue = this.chartHeight / maxValue;
    const scalePercent = 100 / maxValue;

    for (const i in data) {
      let d = document.createElement('div');
      d.style.cssText = "--value: " + Math.floor(data[i] * scaleValue);
      d.setAttribute('data-tooltip', Math.round(data[i] * scalePercent) + '%');
      this.chartBody.append(d);
    }
  }

  update(newData = []) {
    while (this.chartBody.lastElementChild) {
      this.chartBody.removeChild(this.chartBody.lastElementChild);
    }
    this.renderData(newData);
  }

  remove() {
    if (this.chartBody) {
      this.chartBody.remove();
    }
  }

  destroy() {
    this.chartBody = null;
  }
}
