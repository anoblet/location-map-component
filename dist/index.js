var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, property, query } from "lit-element";
import "@material/mwc-button";
export default class MapLocation extends LitElement {
    constructor() {
        super();
        this.coordinatesList = [];
        var script = document.createElement("script");
        script.src =
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyBymVlPy3ThcGRSC_97HcCNzmbtozE2XSU&callback=initMap";
        script.defer = true;
        script.async = true;
        document.head.appendChild(script);
    }
    static get styles() {
        return css `
      * {
        box-sizing: border-box;
      }

      :host {
        display: flex;
        flex-direction: column;
      }

      #action {
        border: 1px solid #000;
        border-radius: 0.25rem;
        display: grid;
        grid-gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
        justify-content: center;
        padding: 1rem;
      }

      #description {
        padding: 1rem 0;
      }

      #grid {
        border: 1px solid #000;
        border-radius: 0.25rem;
        display: grid;
        flex: 1;
        padding: 1rem;
        grid-gap: 1rem;
      }

      #log {
        border: 1px solid #000;
        border-radius: 0.25rem;
        display: grid;
        flex: 1;
        grid-gap: 1rem;
        grid-template-columns: repeat(2, 1fr);
        padding: 1rem;
        width: 100%;
      }

      #map {
        border: 1px solid #000;
        border-radius: 0.25rem;
        min-height: 250px;
        padding: 1rem;
      }

      .center {
        display: flex;
        justify-content: center;
      }

      .header {
        border-bottom: 1px solid #000;
        font-weight: bold;
        justify-content: center;
      }
    `;
    }
    render() {
        return html `
      <div id="description">
        <b>Objective</b>:
        <p>Map and track the location of a user</p>
      </div>
      <div id="grid">
        <div id="map">map</div>
        <div id="action">
          <mwc-button @click=${this.watchPosition} outlined>Watch</mwc-button>
          <mwc-button @click=${this.updatePosition} outlined>Update</mwc-button>
        </div>
        <div id="log">
          <span class="center header"
            ><mwc-button disabled>Latitude</mwc-button></span
          ><span class="center header"
            ><mwc-button disabled>Longitude</mwc-button></span
          >
          ${this.coordinatesList.map((coordinates) => html `<span class="center">${coordinates.latitude}</span
                ><span class="center">${coordinates.longitude}</span>`)}
        </div>
      </div>
    `;
    }
    firstUpdated() {
        const _window = window;
        _window.initMap = function () {
            this.updatePosition();
        }.bind(this);
    }
    updatePosition() {
        navigator.geolocation.getCurrentPosition((position) => this.onPosition(position));
    }
    onPosition(position) {
        const coordinates = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        };
        this.updateMap({ lat: coordinates.latitude, lng: coordinates.longitude });
        this.coordinatesList = [...this.coordinatesList, coordinates];
    }
    updateMap(position) {
        const _window = window;
        const map = new _window.google.maps.Map(this.map, {
            center: position,
            zoom: 15,
        });
        const marker = new _window.google.maps.Marker({
            position,
            map,
        });
    }
    watchPosition() {
        navigator.geolocation.getCurrentPosition((position) => this.onPosition(position));
    }
}
__decorate([
    property()
], MapLocation.prototype, "coordinatesList", void 0);
__decorate([
    query("#map")
], MapLocation.prototype, "map", void 0);
customElements.define("map-location", MapLocation);
