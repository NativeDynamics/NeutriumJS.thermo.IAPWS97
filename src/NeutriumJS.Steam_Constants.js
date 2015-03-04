//
//	NeutriumJS Steam
//	https://github.com/NativeDynamics/NeutriumJS.Steam
//
//	Copyright 2014, Native Dynamics
//	https://neutrium.net
//
//	Licensed under the Creative Commons Attribution 4.0 International
//	http://creativecommons.org/licenses/by/4.0/legalcode
//
var NeutriumJS = (function (NeutriumJS) {
	"use strict";

	var NS = NeutriumJS.Steam = NeutriumJS.Steam || {};

	var constants = {

			// Critical and Gas Constants
			'R' : 0.461526,					// kJ/kg.K
			//'Tc' : 647.096,					// K
			'Pc' : 22.064,					// Mpa
			//'Rhoc' : 322,					// kg/m3

			// Temperature and Pressure region limits
			'MIN_P' : 0.000611213,			// MPa
			'MAX_P' : 100.0,				// MPa
			'MAX_T' : 2273.15,				// K
			'MIN_T' : 273.15,				// K
			'MIN_S' : -0.000154549592045,	// kJ/kg
			'MIN_H' : -0.041587825659104,	// kJ/kg.K

			'R2_MIN_T' : 623.15,			// K
			'R2_MAX_T' : 1073.15,			// K
			'R2_CRT_S' : 5.85,				// kJ/kg.K
			'R2_CRT_P' : 4.0,				// MPa

			'B23_MIN_P' : 16.5292,			// MPa (The region 2-3 boundary pressure at R2_MIN_T)
			'B23_MAX_T' : 863.15,			// K   (The region 2-3 boundary temperature at MAX_P)

			'R5_MIN_T' : 1073.15,			// K
			'R5_MAX_P' : 50,				// Mpa
			'R5_MAX_T' : 2273.15,			// K

			'R3_MIN_T' : 623.15,			// K
			'R3_CRT_S' : 4.41202148223476,	// kJ/kg.K

			'B23_S_MIN' : 5.048096828,
			'B23_S_MAX' : 5.260578707,

			'B23_H_MIN' : 2563.592004,
			'B23_H_MAX' : 2812.942061,
		};


	NS.CONST = CONST;

	function CONST(name) {
		if (constants.hasOwnProperty(name)) {
			return constants[name];
		}

		return null;
	}

	return NeutriumJS;
}(NeutriumJS || {}));
