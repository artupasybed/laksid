<template>
    <div>
        <b-card
          
            header="Sesuap Nasi"
            header-tag="h1"
        >
      <form @submit.prevent="onSubmit">
            <b-row class="my-1">
                <b-col sm="10" offset="">
                <label for="input-small">NETWORK:</label>
                <b-form-select v-model="selected" :value="null" required :options="options" size="md" class="mt-3 mb-6">
                </b-form-select>
                </b-col>
            </b-row>
            <b-row class="my-1">
                <b-col sm="10" offset="">
                <label for="input-small">MCC-MNC-LAC-CELLID:</label>
                <b-form-input id="input-small" size="md" placeholder="MCC-MNC-LAC-CELLID" v-model="lacid" required></b-form-input>
                </b-col>
            </b-row>
            <b-button type="submit" href="#" variant="primary" size="md" class="mt-3 mb-6" @click="onSubmit()">Search</b-button>
      </form>
      <div>
        <l-map style="height: 300px" 
        :zoom="zoom" 
        :center="this.center"
        >
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          <l-marker :lat-lng="this.markerLatLng">
              <l-popup>
                <div @click="innerClick">
                  Description
                  <p v-if="this.hasil != null">
                     Address:  {{this.hasil.address}}<br> 
                      Accuracy:  {{this.hasil.accuracy}}<br> 
                      Coordinate:  {{this.hasil.lat }},{{this.hasil.lon}} <br>
                  </p>
                </div>
              </l-popup>

          </l-marker>
        </l-map>
      </div>
      <h1 v-if="this.hasil != null">
      Address:  {{this.hasil.address}}<br> 
      Accuracy:  {{this.hasil.accuracy}}<br> 
      Coordinate:  {{this.hasil.lat }},{{this.hasil.lon}} <br>
        
        </h1>
     
         </b-card>
    </div>
</template>
<script src='./assets/js/components/script.js'></script>
<script>
// import axios from 'axios';
// import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from "vue2-leaflet";
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

  export default {
      name: 'sesuapnasi',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip
  },
    data() {
      return {
        network: [],
        radio: null,
        mcc: "510",
        mnc: "",
        lacid: "",
        lac: "",
        cellid: "",
        hasil: null,
        selected: null,
        latLng: [],
        options: [
          { value: null, text: 'PLEASE SELECT NETWORK', disabled: true },
          { value: 'gsm', text: 'GSM' },
          { value: 'cdma', text: 'CDMA' },
          { value: 'umts' , text: 'UMTS' },
          { value: 'lte', text: 'LTE' }
        ],
      //maps
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution:
          '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        zoom: 5,
        center: [-1.2459, 117.8389],
        markerLatLng: [-1.2459, 117.8389]
        // markerLatLng: null
      }
    },
   
    methods: {
        onSubmit(){
         const string = this.lacid.split("-")
         const mnc = string[1]
         const lac =string[2]
         const cid = string[3]
         const radio = this.selected
        //  alert(radio)
         const settings = {
          method: "POST",
          headers: {},
          body: JSON.stringify({
            "token": "de235bb988154a",
            "radio": radio,
            "mcc": 510,
            "mnc": mnc,
            "cells": [{"lac": lac,
            "cid": cid}],
            "address": 1})
        };
        fetch("https://us1.unwiredlabs.com/v2/process.php", settings)
          .then(response => response.json())
          .then(data => (
            this.hasil = data,
            this.markerLatLng = [data.lat,data.lon],
            this.center = [data.lat,data.lon]
          ))
          // this.latLng = [data.hasil.lat , data.hasil.lon]
        },
        // zoomUpdate(zoom) {
        //   this.currentZoom = zoom;
        // },
        // centerUpdate(center) {
        //   this.currentCenter = center;
        // },
        // showLongText() {
        //   this.showParagraph = !this.showParagraph;
        // },
        innerClick() {
          alert("Click!");
        }
        
    }

  }

  
</script>