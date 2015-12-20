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
		define('NeutriumJS/Steam/HS', ['NeutriumJS/Steam', 'NeutriumJS/Steam/PT', 'NeutriumJS/Steam/PH'], factory);
	}
	else if (typeof exports === "object")
	{
		module.exports = factory(require('NeutriumJS.Steam'), require('NeutriumJS.Steam.PT'), require('NeutriumJS.Steam.PH'));
	}
	else
	{
		root.NeutriumJS = root.NeutriumJS || {};
		root.NeutriumJS.Steam = root.NeutriumJS.Steam || {};
		root.NeutriumJS.Steam.HS = factory(root.NeutriumJS.Steam, root.NeutriumJS.Steam.PT, root.NeutriumJS.Steam.PH);
	}
}(this, function (NS, PT, PH) {
	"use strict";

	var HS = {
			solve : solve,

			// Exposed for testing purpose
			b2ab_S_H : b2ab_S_H,
			b23_HS_T : b23_HS_T,
			b14_S_H : b14_S_H,
			b3A_S_H : b3A_S_H,
			b2ab_S_Hsat : b2ab_S_Hsat,
			b2c3b_S_H : b2c3b_S_H,
			b13_S_H : b13_S_H,
			r4_HS_Tsat : r4_HS_Tsat
		};

	return HS;

	//
	//	Comments : Determines which IAPWS-IF97 region a entalphy and entropy combination lie in.
	//
	//	@param h is the enthalphy in kJ/kg
	//	@param s is the entropy in kJ . K^-1 . kg^1
	//
	function solve(h, s)
	{
		var region = findRegion_HS(h, s),
			result = null;

		switch(region)
		{
			case 1	: result = r1_HS(h, s); break;
			case 2	: result = r2_HS(h, s); break;
			case 3	: result = r3_HS(h, s); break;
			case 4	: result = r4_HS(h, s); break;
		}

		return result;
	}

	function findRegion_HS(h, s)
	{
		// Interpolate across the saturation curve to test if below P = 0.000611 MPa line
		// Refer to Figure 3 in IAPWS HS document for graphical depiction
		// dG = dH - T*dS where dG = 0 for equillibrium reactions like phase change
		var B23_S = 5.260578707,
			B3_S = 4.41202148223476,
			B13_S = 3.778281340,
			B23_H = 2812.942061,
			hcheck = 273.15*(s - NS.CONST('MIN_S')) + NS.CONST('MIN_H');

		if((s <= 9.155759395 && h < hcheck) || s < NS.CONST('MIN_S') || h < NS.CONST('MIN_H') )
		{
			return -1;
		}

		// Region 1
		if(-0.0001545495919 <= s && s <= B13_S && b14_S_H(s) <= h && h <= b13_S_H(s))
		{
			return 1;
		}

		// Region 2 or 3 interface
		if(5.048096828 <= s && s <= B23_S && 2563.592004 <= h && h <= B23_H)
		{
			// Do check using the PB23
			var T = b23_HS_T(h, s),
				P = r2C_HS_P(h, s),
				Pcheck = PT.b23_T_P(T);

			if(Pcheck > P)
			{
				return 2;
			}
			else
			{
				return 3;
			}
		}

		// Region 2
		if((h >= B23_H || s > B23_S) && ((s >= 5.85 && h >= b2ab_S_Hsat(s)) || (s < 5.85 && h >= b2c3b_S_H(s))))
		{
			return 2;
		}

		// Region 3
		if((s >= B3_S && h >= b2c3b_S_H(s)) || (B13_S < s && s < B3_S && h >= b3A_S_H(s)) || (s <= B13_S && h > b13_S_H(s)))
		{
			return 3;
		}

		return 4;
	}

	//
	// Region Identification Equations
	//

	// h'_1 Equation 3 in HS Region 3 & 4 Supplementary release
	function b14_S_H(s)
	{
		var R4_HS_I = [0,0,1,1,2,2,3,3,4,4,4,5,5,7,8,12,12,14,14,16,20,20,22,24,28,32,32],
			R4_HS_J = [14,36,3,16,0,5,4,36,4,16,24,18,24,1,4,2,4,1,22,10,12,28,8,3,0,6,8],
			R4_HS_N = [3.32171191705237E-1,6.112177063234960E-4,-8.82092478906822,-4.5562819254325E-1,-2.63483840850452E-5,-2.23949661148062E1,-4.28398660164013,-6.16679338856916E-1,-1.468230311044E1,2.84523138727299E2,-1.13398503195444E2,1.15671380760859E3,3.95551267359325E2,-1.54891257229285,1.94486637751291E1,-3.57915139457043,-3.35369414148819,-6.6442679633246E-1,3.23321885383934E4,3.31766744667084E3,-2.23501257931087E4,5.73953875852936E6,1.73226193407919E2,-3.63968822121321E-2,8.34596332878346E-7,5.03611916682674,6.55444787064505E1],
			sig = s/3.8,
			h = 0;

		for(var i = 0; i < 27; i++)
		{
			var N = R4_HS_N[i],
				I = R4_HS_I[i],
				J = R4_HS_J[i];

			h += N*Math.pow(sig - 1.09, I)*Math.pow(sig + 0.0000366, J);
		}

		return 1700*h;
	}

	function b13_S_H(s)
	{
		var B13_HS_I = [0,1,1,3,5,6],
			B13_HS_J = [0,-2,2,-12,-4,-3],
			B13_HS_N = [0.913965547600543, -0.0000430944856041991, 60.3235694765419, 1.17518273082168E-18, 0.220000904781292, -69.0815545851641],
			sig = s/3.8,
			h = 0;

		for(var i = 0; i < 6; i++) {
			var N = B13_HS_N[i],
				I = B13_HS_I[i],
				J = B13_HS_J[i];

			h += N*Math.pow(sig - 0.884, I)*Math.pow(sig - 0.864, J);
		}

		return 1700*h;
	}

	// Calculates the temperature on the region 2-3 boundary S-curve
	// T_B23(h,s) Equation 8 in HS Region 3 & 4 in suplementry
	function b23_HS_T(h, s)
	{

		var B23_HS_I = [-12,-10,-8,-4,-3,-2,-2,-2,-2,0,1,1,1,3,3,5,6,6,8,8,8,12,12,14,14],
			B23_HS_J = [10,8,3,4,3,-6,2,3,4,0,-3,-2,10,-2,-1,-5,-6,-3,-8,-2,-1,-12,-1,-12,1],
			B23_HS_N = [6.2909626082981E-4,-8.23453502583165E-4,5.15446951519474E-8,-1.17565945784945,3.48519684726192,-5.07837382408313E-12,-2.84637670005479,-2.36092263939673,6.01492324973779,1.48039650824546,3.60075182221907E-4,-1.26700045009952E-2,-1.22184332521413E6,1.49276502463272E-1,6.98733471798484E-1,-2.52207040114321E-2,1.47151930985213E-2,-1.08618917681849,-9.36875039816322E-4,8.19877897570217E1,-1.82041861521835E2,2.61907376402688E-6,-2.91626417025961E4,1.40660774926165E-5,7.83237062349385E6],
			m = h/3000,
			sig = s/5.3,
			T = 0;

		for(var i = 0; i < 25; i++)
		{
			var N = B23_HS_N[i],
				I = B23_HS_I[i],
				J = B23_HS_J[i];

			T += N*Math.pow(m - 0.727, I)*Math.pow(sig - 0.864, J);
		}

		return 900*T;
	}

	// The boundary equation for HS regions 2A and 2b (Equation 2 in supplementary release for HS)
	function b2ab_S_H(s)
	{
		return (-3498.98083432139 + 2575.60716905876*s + -421.073558227969*s*s + 27.6349063799944*s*s*s);
	}

	// Equation 5 in the region 3 & 4 HS suplementary release
	function b2ab_S_Hsat(s)
	{
		var B2ab_I = [1,1,2,2,4,4,7,8,8,10,12,12,18,20,24,28,28,28,28,28,32,32,32,32,32,36,36,36,36,36],
			B2ab_J = [8,24,4,32,1,2,7,5,12,1,0,7,10,12,32,8,12,20,22,24,2,7,12,14,24,10,12,20,22,28],
			B2ab_N = [-0.524581170928788E3, -0.926947218142218E7, -0.237385107491666E3, 0.210770155812776E11, -0.239494562010986E2, 0.221802480294197E3, -0.510472533393438E7, 0.124981396109147E7, 0.200008436996201E10, -0.815158509791035E3, -0.157612685637523E3, -0.114200422332791E11, 0.662364680776872E16, -0.227622818296144E19, -0.171048081348406E32,6.60788766938091E15,1.66320055886021E22,-2.18003784381501E29,-7.87276140295618E29,1.51062329700346E31,7.95732170300541E6,1.31957647355347E15,-3.2509706829914E23,-4.18600611419248E25,2.97478906557467E34,-9.53588761745473E19,1.66957699620939E24,-1.75407764869978E32,3.47581490626396E34,-7.10971318427851E38],
			sig1 = s/5.21,
			sig2 = s/9.2,
			Hsat = 0;

		for(var i = 0; i < 30; i++)
		{
			var I = B2ab_I[i],
				J = B2ab_J[i],
				N = B2ab_N[i];

			Hsat += N*Math.pow(1/sig1 - 0.513, I)*Math.pow(sig2 - 0.524, J);
		}

		return 2800*Math.exp(Hsat);
	}


	// h"_2c3b(s) Equation 6 in HS region 3 and 4 suplementary release
	function b2c3b_S_H(s)
	{
		// Table 17 in in IAPWS-97 HS region 3 and 4
		var B2c3b_HS_I = [0,0,0,1,1,5,6,7,8,8,12,16,22,22,24,36],
			B2c3b_HS_J = [0,3,4,0,12,36,12,16,2,20,32,36,2,32,7,20],
			B2c3b_HS_N = [1.04351280732769,-2.27807912708513,1.80535256723202,0.420440834792042,-1.0572124483466E5,4.36911607493884E24,-3.28032702839753E11,-6.7868676080427E15,7.43957464645363E3,-3.56896445355761E19,1.67590585186801E31,-3.55028625419105E37,3.96611982166538E11,-4.14716268484468E40,3.59080103867382E18,-1.16994334851995E40],
			h = 0,
			sigma = s/5.9;

		for(var i = 0; i < 16; i++)
		{
			var I = B2c3b_HS_I[i],
				J = B2c3b_HS_J[i],
				N = B2c3b_HS_N[i];

			h += N*Math.pow(sigma-1.02,I)*Math.pow(sigma-0.726,J);
		}

		return 2800*Math.pow(h,4);
	}

	// h'_3a Equation 4 in HS Region 3 and 4
	// Used as a boundary check between 3a and 3b when P < Pc
	// Function to work out the backwards (h,s) boundry for region 3A
	function b3A_S_H(s)
	{
		// Table 10 in IAPWS-97 HS region 3 and 4
		var B3A_HS_I = [0, 0, 0, 0, 2, 3, 4, 4, 5, 5, 6, 7, 7, 7, 10, 10, 10, 32, 32],
			B3A_HS_J = [1, 4, 10, 16, 1, 36, 3, 16, 20, 36, 4, 2, 28, 32, 14, 32, 36, 0, 6],
			B3A_HS_N = [0.822673364673336, 0.181977213534479, -0.0112000260313624, -0.000746778287048033, -0.179046263257381, 0.0424220110836657, -0.341355823438768, -2.09881740853565, -8.22477343323596, -4.99684082076008, 0.191413958471069, 0.0581062241093136, -1655.05498701029, 1588.70443421201, -85.0623535172818, -31771.4386511207, -94589.0406632871, -1.3927384708869E-6, 0.63105253224098],
			sig = s/3.8,
			hdash = 0;

		for(var i = 0; i < 19; i++)
		{
			var N = B3A_HS_N[i],
				I = B3A_HS_I[i],
				J = B3A_HS_J[i];

			hdash += N*Math.pow(sig-1.09,I)*Math.pow(sig+0.0000366,J);
		}

		return 1700*hdash;
	}

	//
	//	Backwards equation for region 1 (h and s given)
	//	Calculates P and uses it in the forwards equations
	//
	function r1_HS(h, s)
	{
		var P = r1_HS_P(h,s),
			T = PH.r1_PH_T(P,h);

		return PT.r1(P,T);
	}

	function r1_HS_P(h, s)
	{
		var R1_HS_I = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 3, 4, 4, 5],
			R1_HS_J = [0, 1, 2, 4, 5, 6, 8, 14, 0, 1, 4, 6, 0, 1, 10, 4, 1, 4, 0],
			R1_HS_N = [-0.691997014660582, -18.361254878756, -9.28332409297335, 65.9639569909906, -16.2060388912024, 450.620017338667, 854.68067822417, 6075.23214001161, 32.6487682621856, -26.9408844582931, -319.9478483343, -928.35430704332, 30.3634537455249, -65.0540422444146, -4309.9131651613, -747.512324096068, 730.000345529245, 1142.84032569021, -436.407041874559],
			m = h/3400,
			sig = s/7.6,
			P = 0;

		for(var i = 0; i < 19; i++)
		{
			var N = R1_HS_N[i],
				I = R1_HS_I[i],
				J = R1_HS_J[i];

			P += N*Math.pow(m+0.05, I)*Math.pow(sig+0.05, J);
		}

		return 100*P;
	}

	//
	//	Backwards equation for region 2 (h and s given)
	//	Calculates P and uses it in the forwards equations
	//
	function r2_HS(h, s)
	{
		var P = r2_HS_P(h,s);

		return PH.r2(P,h);
	}

	function r2_HS_P(h, s)
	{
		var P;

		if(h <= b2ab_S_H(s))
		{
			P = r2A_HS_P(h,s);
		}
		else
		{
			if(s >= 5.85)
			{
				P = r2B_HS_P(h,s);
			}
			else
			{
				P = r2C_HS_P(h,s);
			}
		}

		return P;
	}

	function r2A_HS_P(h, s)
	{
		var R2A_HS_I = [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 4, 5, 5, 6, 7],
			R2A_HS_J = [1, 3, 6, 16, 20, 22, 0, 1, 2, 3, 5, 6, 10, 16, 20, 22, 3, 16, 20, 0, 2, 3, 6, 16, 16, 3, 16, 3, 1],
			R2A_HS_N = [-0.0182575361923032, -0.125229548799536, 0.592290437320145, 6.04769706185122, 238.624965444474, -298.639090222922, 0.051225081304075, -0.437266515606486, 0.413336902999504, -5.16468254574773, -5.57014838445711, 12.8555037824478, 11.414410895329, -119.504225652714, -2847.7798596156, 4317.57846408006, 1.1289404080265, 1974.09186206319, 1516.12444706087, 0.0141324451421235, 0.585501282219601, -2.97258075863012, 5.94567314847319, -6236.56565798905, 9659.86235133332, 6.81500934948134, -6332.07286824489, -5.5891922446576, 0.0400645798472063],
			m = h/4200,
			sig = s/12,
			P = 0;

		for (var i = 0; i < 29; i++)
		{
			var N = R2A_HS_N[i],
				I = R2A_HS_I[i],
				J = R2A_HS_J[i];

			P += N*Math.pow(m-0.5,I)*Math.pow(sig-1.2,J);
		}

		return 4*Math.pow(P,4);		// Corresponding pressure for h, s
	}

	function r2B_HS_P(h, s)
	{
		var R2B_HS_I = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 5, 5, 6, 6, 6, 7, 7, 8, 8, 8, 8, 12, 14],
			R2B_HS_J = [0, 1, 2, 4, 8, 0, 1, 2, 3, 5, 12, 1, 6, 18, 0, 1, 7, 12, 1, 16, 1, 12, 1, 8, 18, 1, 16, 1, 3, 14, 18, 10, 16],
			R2B_HS_N = [0.0801496989929495, -0.543862807146111, 0.337455597421283, 8.9055545115745, 313.840736431485, 0.797367065977789, -1.2161697355624, 8.72803386937477, -16.9769781757602, -186.552827328416, 95115.9274344237, -18.9168510120494, -4334.0703719484, 543212633.012715, 0.144793408386013, 128.024559637516, -67230.9534071268, 33697238.0095287, -586.63419676272, -22140322476.9889, 1716.06668708389, -570817595.806302, -3121.09693178482, -2078413.8463301, 3056059461577.86, 3221.57004314333, 326810259797.295, -1441.04158934487, 410.694867802691, 109077066873.024, -24796465425889.3, 1888019068.65134, -123651009018773],
			m = h/4100,
			sig = s/7.9,
			P = 0;

		for (var i = 0; i < 33; i++)
		{
			var N = R2B_HS_N[i],
				I = R2B_HS_I[i],
				J = R2B_HS_J[i];

			P += N*Math.pow(m-0.6, I)*Math.pow(sig-1.01, J);
		}

		return 100*Math.pow(P, 4);
	}

	function r2C_HS_P(h, s)
	{
		var R2C_HS_I = [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 5, 5, 5, 5, 6, 6, 10, 12, 16],
			R2C_HS_J = [0, 1, 2, 3, 4, 8, 0, 2, 5, 8, 14, 2, 3, 7, 10, 18, 0, 5, 8, 16, 18, 18, 1, 4, 6, 14, 8, 18, 7, 7, 10],
			R2C_HS_N = [0.112225607199012, -3.39005953606712, -32.0503911730094, -197.5973051049, -407.693861553446, 13294.3775222331, 1.70846839774007, 37.3694198142245, 3581.44365815434, 423014.446424664, -751071025.760063, 52.3446127607898, -228.351290812417, -960652.417056937, -80705929.2526074, 1626980172256.69, 0.772465073604171, 46392.9973837746, -13731788.5134128, 1704703926305.12, -25110462818730.8, 31774883083552.0, 53.8685623675312, -55308.9094625169, -1028615.22421405, 2042494187562.34, 273918446.626977, -2639631463126850.0, -1078908541.08088, -29649262098.0124, -1117549073234240.0],
			m = h/3500,
			sig = s/5.9,
			P = 0;

		for (var i = 0; i < 31; i++)
		{
			var N = R2C_HS_N[i],
				I = R2C_HS_I[i],
				J = R2C_HS_J[i];

			P += N*Math.pow(m-0.7,I)*Math.pow(sig-1.1,J);
		}

		return 100*Math.pow(P,4);
	}

	//
	// Region 3
	//
	function r3_HS(h, s)
	{
		var P = r3_HS_P(h, s);

		return PH.r2(P, h);
	}

	function r3_HS_P(h, s)
	{
		if(s <= NS.CONST('R3_CRT_S'))
		{
			return r3A_HS_P(h, s);
		}
		else
		{
			return r3B_HS_P(h, s);
		}
	}

	function r3A_HS_P(h, s)
	{
		var R3A_HS_I = [0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 6, 7, 8, 10, 10, 14, 18, 20, 22, 22, 24, 28, 28, 32, 32],
			R3A_HS_J = [0, 1, 5, 0, 3, 4, 8, 14, 6, 16, 0, 2, 3, 0, 1, 4, 5, 28, 28, 24, 1, 32, 36, 22, 28, 36, 16, 28, 36, 16, 36, 10, 28, ],
			R3A_HS_N = [7.70889828326934, -26.0835009128688, 267.416218930389, 17.2221089496844, -293.54233214597, 614.135601882478, -61056.2757725674, -65127225.1118219, 73591.9313521937, -11664650591.4191, 35.5267086434461, -596.144543825955, -475.842430145708, 69.6781965359503, 335.674250377312, 25052.6809130882, 146997.380630766, 53806931509153400000.0, 1.43619827291346E+21, 36498586616599400000.0, -2547.41561156775, 2.40120197096563E+27, -3.93847464679496E+29, 1.47073407024852E+24, -4.26391250432059E+31, 1.94509340621077E+38, 6.66212132114896E+23, 7.06777016552858E+33, 1.75563621975576E+41, 1.08408607429124E+28, 7.30872705175151E+43, 1.5914584739887E+24, 3.77121605943324E+40],
			m = h/2300,
			sig = s/4.4,
			P = 0;

		for(var i = 0; i < 33; i++)
		{
			var N = R3A_HS_N[i],
				I = R3A_HS_I[i],
				J = R3A_HS_J[i];

			P += N*Math.pow(m-1.01,I)*Math.pow(sig-0.75,J);
		}

		return 99*P;
	}

	function r3B_HS_P(h, s)
	{
		// Table X data from IAPWS-97
		var R3B_HS_I = [-12, -12, -12, -12, -12, -10, -10, -10, -10, -8, -8, -6, -6, -6, -6, -5, -4, -4, -4, -3, -3, -3, -3, -2, -2, -1, 0, 2, 2, 5, 6, 8, 10, 14, 14],
			R3B_HS_J = [2, 10, 12, 14, 20, 2, 10, 14, 18, 2, 8, 2, 6, 7, 8, 10, 4, 5, 8, 1, 3, 5, 6, 0, 1, 0, 3, 0, 1, 0, 1, 1, 1, 3, 7],
			R3B_HS_N = [1.25244360717979E-13, -0.0126599322553713, 5.06878030140626, 31.7847171154202, -391041.161399932, -9.75733406392044E-11, -18.6312419488279, 510.973543414101, 373847.005822362, 2.99804024666572E-8, 20.0544393820342, -4.98030487662829E-6, -10.230180636003, 55.2819126990325, -206.211367510878, -7940.12232324823, 7.82248472028153, -58.6544326902468, 3550.73647696481, -0.000115303107290162, -1.75092403171802, 257.98168774816, -727.048374179467, 0.000121644822609198, 0.0393137871762692, 0.00704181005909296, -82.910820069811, -0.26517881813125, 13.7531682453991, -52.2394090753046, 2405.56298941048, -22736.1631268929, 89074.6343932567, -23923456.5822486, 5687958081.29714],
			m = h/2800,
			sig = s/5.3,
			P = 0;

		for(var i = 0; i < 35; i++)
		{
			var N = R3B_HS_N[i],
				I = R3B_HS_I[i],
				J = R3B_HS_J[i];

			P += N*Math.pow(m-0.681,I)*Math.pow(sig-0.792,J);
		}

		return 16.6/P;
	}

	//
	// Region 4
	//
	function r4_HS(h, s)
	{
		var T = r4_HS_Tsat(h, s),
			P = PT.r4_T_Psat(T);

		return PT.solve(P, T);
	}


	// Tsat(h,s) Equation 9 in the HS Region 3 & 4 Supplementary release
	function r4_HS_Tsat(h, s)
	{
		var R4_I = [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 5, 5, 5, 5, 6, 6, 6, 8, 10, 10, 12, 14, 14, 16, 16, 18, 18, 18, 20, 28],
			R4_J = [0, 3, 12, 0, 1, 2, 5, 0, 5, 8, 0, 2, 3, 4, 0, 1, 1, 2, 4, 16, 6, 8, 22, 1, 20, 36, 24, 1, 28, 12, 32, 14, 22, 36, 24, 36],
			R4_N = [0.179882673606601, -0.267507455199603, 0.11627672261266E1, 0.147545428713616, -0.512871635973248, 0.421333567697984, 0.56374952218987, 0.429274443819153, -0.33570455214214E1, 0.108890916499278E2, -0.248483390456012, 0.30415322190639, -0.494819763939905, 0.107551674933261E1, 0.733888415457688E-1, 0.140170545411085E-1, -0.106110975998808, 0.168324361811875E-1, 0.125028363714877E1, 0.101316840309509E4, -0.151791558000712E1, 0.524277865990866E2, 0.230495545563912E5, 0.249459806365456E-1, 0.210796467412137E7, 0.366836848613065E9, -0.144814105365163E9, -0.17927637300359E-2, 0.489955602100459E10, 0.471262212070518E3, -0.829294390198652E11, -0.171545662263191E4, 0.355777682973575E7, 0.586062760258436E12, -0.129887635078195E8, 0.317247449371057057E11],
			mu = h/2800,
			sig = s/9.2,
			T = 0;

		for(var i = 0; i < 36; i++)
		{
			var I = R4_I[i],
				J = R4_J[i],
				N = R4_N[i];

			T += N*Math.pow(mu - 0.119, I)*Math.pow(sig - 1.07, J);
		}

		return 550*T;
	}

}));





