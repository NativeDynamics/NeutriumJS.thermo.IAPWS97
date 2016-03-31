//
//	NeutriumJS Steam
//	https://github.com/NativeDynamics/NeutriumJS.Steam
//
//	Copyright 2015, Native Dynamics
//	https://neutrium.net
//
//	Licensed under the Creative Commons Attribution 4.0 International
//	http://creativecommons.org/licenses/by/4.0/legalcode
//

(function (root, factory) {
    "use strict";

	if(typeof define === "function" && define.amd)
	{
		require(['NeutriumJS/Qty'], function(Qty) {
			define('NeutriumJS/thermo/IAPWS97', ['NeutriumJS/Qty'], factory);
		},
		function(err) {
			define('NeutriumJS/thermo/IAPWS97', [], factory);
		});
	}
	else if (typeof exports === "object" && module.exports)
	{
		module.exports = factory(require('NeutriumJS.Qty'));
	}
	else
	{
		root.NeutriumJS = root.NeutriumJS || {};
		root.NeutriumJS.thermo = root.NeutriumJS.thermo || {};
		root.NeutriumJS.thermo.IAPWS97 = factory(root.NeutriumJS.Qty);
	}
}(this, function(Qty) {
	"use strict";

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
		},
		NS = {
			SteamResult : SteamResult,
			Exception : Exception,
			CONST : CONST,
			viscosity : aux_Viscosity,
			thermal_conductivity : aux_Thermal_Conductivity,
			surface_tension : aux_Surface_Tension,
			dielectric_constant : aux_Dielectric_Constant,
			ionization_constant : aux_Ionization_Constant,

		};

	return NS;

	// The Steam result object

	function SteamResult(initValue)
	{
		var self = this;

		// Pressure, P, Mpa
		self.p = initValue.p;
		// Temperature, T, K
		self.t = initValue.t;
		// Specific volume, v, m^3/kg
		self.v = initValue.v;
		// Density, rho, kg/m^3
		self.rho = 1/initValue.v;
		// Specific internal energy, u, kJ/kg
		self.u = initValue.u;
		// Specific entropy, s, kJ/kg
		self.s = initValue.s;
		// Specific enthalpy, h, kJ/kg.K
		self.h = initValue.h;
		// Specific isobaric heat capacity, Cp kJ/kg.K
		self.cp = initValue.cp;
		// Specific isochoric heat capacity, Cv
		self.cv = initValue.cv;
		// Speed of Sound, w, m/s
		self.w = initValue.w;
		// Viscosity cP,
		self.mu = aux_Viscosity(initValue.t, self.rho)/1000;
		// Thermal Conductivity W/m.K
		self.k = aux_Thermal_Conductivity(initValue.t, self.rho)/1000;
		// Surface Tension mN/m
		self.sig = aux_Surface_Tension(initValue.t);
		// Dielectric constant
		self.epsilon = aux_Dielectric_Constant(initValue.t, self.rho);
		// Ionisation constant
		self.ic = aux_Ionization_Constant(initValue.t, self.rho);
	}

	SteamResult.prototype = {

		// Return the steam results as Qty's if NeutriumJS.convert is loaded
		asQty : function() {
			var self = this;
			if(typeof Qty !== 'undefined')
			{
				self.p = new Qty(self.p + 'MPa');
				// Temperature, T, K
				self.t = new Qty(self.t + 'K');
				// Specific volume, v, m^3/kg
				self.v = new Qty(self.v + 'm^3/kg');
				// Density, rho, kg/m^3
				self.rho = new Qty(self.rho + 'kg/m^3');
				// Specific internal energy, u, kJ/kg
				self.u = new Qty(self.u + 'kJ/kg');
				// Specific entropy, s, kJ/kg
				self.s = new Qty(self.s + 'kJ/kg');
				// Specific enthalpy, h, kJ/kg.K
				self.h = new Qty(self.h + 'kJ/kg.K');
				// Specific isobaric heat capacity, Cp kJ/kg.K
				self.cp = new Qty(self.cp + 'kJ/kg.K');
				// Specific isochoric heat capacity, Cv
				self.cv = new Qty(self.cv + 'kJ/kg.K');
				// Speed of Sound, w, m/s
				self.w = new Qty(self.w + 'm/s');
				// Viscosity cP,
				self.mu = new Qty(self.mu + 'cP');
				// Thermal Conductivity W/m.K
				self.k = new Qty(self.k + 'W/m.K');
				// Surface Tension mN/m
				self.sig = new Qty(self.sig + 'mN/m');
				// Dielectric constant
				self.epsilon = new Qty(self.epsilon + 'mN/m');
				// Ionisation constant
				self.ic = new Qty(self.ic);

				return self;
			}
			else
			{
				throw new Exception('NeutriumJS.convert module not found, please load module if useing asQty()');
			}
		}
	};


	function CONST(name)
	{
		if (constants.hasOwnProperty(name))
		{
			return constants[name];
		}

		return null;
	}

		// Auxiliary Equation for additonal properties

	//
	//	Comments : IAPWS Viscosity of ordinary water substances 2008
	//
	//	@param T is the temperature in K
	//	@param Rho is the density in kg/m^3
	//
	//	@return Viscosity in Pa.s (P)
	//
	function aux_Viscosity(T, ρ)
	{

		var T_hat = T/647.096,
			ρ_hat = ρ/322,
			μ0_H = [1.67752, 2.20462, 0.6366564, -0.241605],
			μ0 = 100*Math.sqrt(T_hat),
			x = 0,
			y = 0;

		for(var i = 0; i < 4; i++)
		{
			x += μ0_H[i]/Math.pow(T_hat, i);
		}

		μ0 = μ0/x;

		var μ1 = 0,
			μ1_H = [5.20094E-1,8.50895E-2,-1.08374,-2.89555E-1,0,0,2.22531E-1,9.99115E-1,1.88797,1.26613,0,1.20573E-1,-2.81378E-1,-9.06851E-1,-7.72479E-1,-4.89837E-1,-2.5704E-1,0,1.61913E-1,2.57399E-1,0,0,0,0,-3.25372E-2,0,0,6.98452E-2,0,0,0,0,0,0,8.72102E-3,0,0,0,0,-4.35673E-3,0,-5.93264E-4];

		for(var j = 0; j < 6; j++)
		{
			x = Math.pow(1/T_hat - 1, j);
			y = 0;

			for(var z = 0; z < 7; z++)
			{
				y += μ1_H[z*6+j]*Math.pow(ρ_hat - 1, z);
			}

			μ1 += x*y;
		}

		μ1 = Math.exp(ρ_hat*μ1);

		// No correction at the subcritical region yet
		var μ2 = 1;

		/*
		// start of critcial enhancement
		var chi = rho_hat*(zetaX(T_hat, rho_hat) - zetaR(rho_hat)*1.5/T_hat),
			xi = 0.13*Math.pow(chi/0.06, 0.63/1.239),
			psi_d = Math.acos(Math.pow(1+xi*xi/1.21, -0.5)),
			w = Math.sqrt((xi/1.9-1)/(xi/1.9+1))*Math.tan(0.5*psi_d),
			Lw = xi/1.9 > 1 ? Math.log((1+w)/(1-w)) : 2*Math.atan(Math.abs(w)),
			qcxi = xi/1.9,
			qdxi = xi/1.1;

		if(xi >  0.3817016416)
		{
			y = (1/12)*Math.sin(3*psi_d) - (1/(4*qcxi))*Math.sin(2*psi_d) + 1/(qcxi*qcxi)*(1 - 5*qcxi*qcxi/4)*Math.sin(psi_d) - 1/Math.pow(qcxi, 3)*((1 - 1.5*qcxi*qcxi)*psi_d - Math.pow(Math.abs(qcxi*qcxi-1),1.5)*Lw);
		}
		else
		{
			y = (1/5)*qcxi*Math.pow(qdxi,5)*(1 - qcxi + qcxi*qcxi - 765*qdxi*qdxi/504);
		}
		*/

		return μ0*μ1*μ2;
	}

		//
	//	Comments : IAPWS Thermal conductivity of ordinary water substances 2011
	//
	//	@param T is the temperature in K
	//	@param Rho is the density in kg/m^3
	//
	//	@return The thermal conductivity in mW/m.K
	//
	function aux_Thermal_Conductivity(T, ρ)
	{
		var T_hat = T/647.096,
			ρ_hat = ρ/322,
			k0_L = [2.443221E-3, 1.323095E-2, 6.770357E-3, -3.454586E-3, 4.096266E-4],
			k0 = 0;

		for(var i = 0; i < 5; i++)
		{
			k0 += k0_L[i]/Math.pow(T_hat, i);
		}

		k0 = Math.sqrt(T_hat)/k0;

		var k1 = 0,
			k1_L = [1.60397357, -0.646013523, 0.111443906, 0.102997357, -0.0504123634, 0.00609859258, 2.33771842, -2.78843778, 1.53616167, -0.463045512, 0.0832827019, -0.00719201245, 2.19650529, -4.54580785, 3.55777244, -1.40944978, 0.275418278, -0.0205938816, -1.21051378, 1.60812989, -0.621178141, 0.0716373224, 0, 0, -2.720337, 4.57586331, -3.18369245, 1.1168348, -0.19268305, 0.012913842],
			x = 0,
			y = 0;

		for(var j = 0; j < 5; j++)
		{
			x = Math.pow(1/T_hat - 1, j);
			y = 0;

			for(var z = 0; z < 6; z++)
			{
				y += k1_L[j*6 + z]*Math.pow(ρ_hat - 1, z);
			}

			k1 += x*y;
		}

		k1 = Math.exp(ρ_hat*k1);

		// The critical enhancement not implemented yet
		var k2 = 0;

		/*
		To be included once zeta(T_hat, rho_hat) function found

		var mu_hat = mu/1E-6,	// need mu
			cp_hat = cp/R,
			chi = rho_hat*(zeta(T_hat, rho_hat) - 1.5*zetaR(rho_hat)/T-hat),
			xi = 0.13*Math.pow(chi/0.06, 0.63/1.239),
			y = (xi/0.4),
			kappa = cp/cv, // get this from previous calculations
			Z = 2/(Math.PI*y)*(((1 - 1/kappa)*Math.atan(y) + y/kappa) - (1 - Math.exp(-1/(1/y + y*y/(3*rho_hat*rho_hat))))),
			k2 = 177.8514*rho_hat*cp_hat*T_hat*Z/mu_hat;

		function zetaR(rho_hat)
		{
			var a = [6.53786807199516, 6.52717759281799, 5.35500529896124, 1.55225959906681, 1.11999926419994, -5.61149954923348, -6.30816983387575, -3.96415689925446, 0.464621290821181, 0.595748562571649, 3.39624167361325, 8.08379285492595, 8.91990208918795, 8.93237374861479, 9.88952565078920, -2.27492629730878, -9.82240510197603, -12.0338729505790, -11.0321960061126, -10.3255051147040, 10.2631854662709, 12.1358413791395, 9.19494865194302, 6.16780999933360, 4.66861294457414, 1.97815050331519, -5.54349664571295, -2.16866274479712, -0.965458722086812, -0.503243546373828];
				j = 0,
				z = 0;

			if(rho_hat <= 0.310559006)
			{
				j = 0;
			}
			else if(rho_hat <= 0.776397516)
			{
				j = 1;
			}
			else if(rho_hat <= 1.242236025)
			{
				j = 2;
			}
			else if(rho_hat <= 1.863354037)
			{
				j = 3;
			}
			else
			{
				j = 4;
			}

			for(var i = 0; i < 6; i++)
			{
				z += A[i*5 + j]*Math.pow(rho_hat, i);
			}

			return 1/z;
		}
		*/

		return k0*k1 + k2;
	}

	//
	//	Comments : IAPWS Surface Tension of ordinary water substances 2014
	//
	//	@param T is the temperature in K
	//
	//	@return The surface tension in mN/m
	//
	function aux_Surface_Tension(T)
	{
		var τ = 1 - T/647.096,
			σ = 235.8*Math.pow(τ,1.256)*(1 - 0.625*τ);

		return σ;
	}

	//
	//	Comments : IAPWS Static Dielectric Constant of ordinary water substances 1997
	//
	//	@param T is the temperature in K
	//	@param ρ is the density in kg . m^-3
	//
	//	@return The surface tension in mN/m
	//
	function aux_Dielectric_Constant(T, ρ)
	{
		var MW = 0.018015268,
			ρm = ρ/MW,	//  Molecular density (mol . m^-3)
			ρρc = ρm/(322/MW),
			α = 1.636E-40,	// Mean molecular polarizability (C^2 . J^-1 . m^2)
			N_a = 6.0221367E23,	// Avogadro's number (mol^-1)
			μ = 6.138E-30,		// Molecular dipole moment (C . m)
			ε_0 = 1/(4E-7*Math.PI*Math.pow(299792458,2)),	// Permittivity of free space (C^2 . J^-1 . m^-1)
			k = 1.380658E-23,	// Boltzmann's constant (J . K^-1)
			Nh = [0.978224486826, -0.957771379375, 0.237511794148, 0.714692244396, -0.298217036956, -0.108863472196, 0.0949327488264, -0.00980469816509, 0.16516763497E-4, 0.937359795772E-4, -0.12317921872E-9],
			//Nh = [0.978224486826,-0.957771379375,0.237511794148,0.714692244396,-0.298217036956,-0.108863472196,0.0949327488264,-0.00980469816509,0.000016516763497,0.0000937359795772,-1.23179218720E-10],
			Ih = [1, 1, 1, 2, 3, 3, 4, 5, 6, 7, 10],
			Jh = [0.25, 1, 2.5, 1.5, 1.5, 2.5, 2, 2, 5, 0.5, 10],
			g = 0;

		for(var i = 0; i < 11; i++)
		{
			g += Nh[i]*Math.pow(ρρc, Ih[i])*Math.pow(647.096/T, Jh[i]);
		}

		g = 1 + g + 0.00196096504426*(ρρc)*Math.pow(T/228 - 1, -1.2);


		var A = N_a*μ*μ*ρm*g/(ε_0*k*T),
			B = N_a*α*ρm/(3*ε_0),
			ε = (1 + A + 5*B + Math.sqrt(9 + 2*A + 18*B + A*A + 10*A*B + 9*B*B))/(4 - 4*B);

		return ε;
	}

	//
	//	Comments : IAPWS Ionization Constant of H2O 2007
	//
	//	@param T is the temperature in K
	//	@param ρ is the density in kg.m^-3
	//
	//	@return The ionization constant in (dimensionless)
	//
	function aux_Ionization_Constant(T, ρ)
	{
		var pK_wg = 0.61415 + 48251.33/T - 67707.93/(T*T) + 10102100/(T*T*T),
			Q = ρ*Math.exp(-0.864671 + 8659.19/T - 22786.2*Math.pow(ρ, 2/3)/(T*T)),
			pK_w = -12*(Math.log10(1+Q) - Q/(Q+1)*ρ*(0.642044 -56.8534/T -0.375754*ρ)) + pK_wg + 2*Math.log10(0.018015268);

		return pK_w;
	}

	function Exception(message)
	{
		this.name = 'NeutriumJS.thermo.IAWPS Exception';
		this.message = message || 'The current input values are out of range for the IAWPS correlations';
	}
}));
