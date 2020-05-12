import { LitElement } from "lit-element";
import "@material/mwc-button";
export default class MapLocation extends LitElement {
    coordinatesList: any[];
    map: any;
    static get styles(): import("lit-element").CSSResult;
    render(): import("lit-element").TemplateResult;
    constructor();
    firstUpdated(): void;
    updatePosition(): void;
    onPosition(position: any): void;
    updateMap(position: any): void;
    watchPosition(): void;
}
