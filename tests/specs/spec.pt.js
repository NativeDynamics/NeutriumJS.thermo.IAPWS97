describe("NeutriumJS.thermo.IAWPS97 Pressure-Temperature equations", function() {

	describe("PT Auxiliary Equations", function() {

		it('Region 2 and 3 boundary equation T = 623.15 K is correct', function() {
			expect(+NeutriumJS.thermo.IAWPS97.PT.b23_T_P(623.15).toFixed(7)).toEqual(16.5291643);
		});

		it('Region 2 and 3 boundary equation P = 16.5291643 MPa is correct', function() {
			expect(+NeutriumJS.thermo.IAWPS97.PT.b23_P_T(16.5291643).toFixed(2)).toEqual(623.15);
		});

	});

	describe("PT Region 1", function() {

		describe("correct results for P = 3 MPa, T = 300 K", function() {
			var result;

			beforeAll(function() {
				result = NeutriumJS.thermo.IAWPS97.PT.solve(3, 300);
			});

			it('Specific gravity (v) is correct', function() {
				expect(+result.v.toFixed(11)).toEqual(0.00100215168);
			});

			it('Specific enthalpy (h) is correct', function() {
				expect(+result.h.toFixed(6)).toEqual(115.331273);
			});

			it('Specific internal energy (u) is correct', function() {
				expect(+result.u.toFixed(6)).toEqual(112.324818);
			});

			it('Specific entropy (s) is correct', function() {
				expect(+result.s.toFixed(9)).toEqual(0.392294792);
			});

			it('Specific isobaric heat capacity (Cp) is correct', function() {
				expect(+result.cp.toFixed(8)).toEqual(4.17301218);
			});

			it('Speed of sound (w) is correct', function() {
				expect(+result.w.toFixed(5)).toEqual(1507.73921);
			});
		});

		describe("correct results for P = 80 MPa, T = 300 K", function() {
			var result;

			beforeAll(function() {
				result = NeutriumJS.thermo.IAWPS97.PT.solve(80, 300);
			});

			it('Specific gravity (v) is correct', function() {
				expect(+result.v.toFixed(12)).toEqual(0.000971180894);
			});

			it('Specific enthalpy (h) is correct', function() {
				expect(+result.h.toFixed(6)).toEqual(184.142828);
			});

			it('Specific internal energy (u) is correct', function() {
				expect(+result.u.toFixed(6)).toEqual(106.448356);
			});

			it('Specific entropy (s) is correct', function() {
				expect(+result.s.toFixed(9)).toEqual(0.368563852);
			});

			it('Specific isobaric heat capacity (Cp) is correct', function() {
				expect(+result.cp.toFixed(8)).toEqual(4.01008987);
			});

			it('Speed of sound (w) is correct', function() {
				expect(+result.w.toFixed(5)).toEqual(1634.69054);
			});
		});

		describe("correct results for P = 3 MPa, T = 500 K", function() {
			var result;

			beforeAll(function() {
				result = NeutriumJS.thermo.IAWPS97.PT.solve(3, 500);
			});

			it('Specific gravity (v) is correct', function() {
				expect(+result.v.toFixed(9)).toEqual(0.001202418);
			});

			it('Specific enthalpy (h) is correct', function() {
				expect(+result.h.toFixed(6)).toEqual(975.542239);
			});

			it('Specific internal energy (u) is correct', function() {
				expect(+result.u.toFixed(6)).toEqual(971.934985);
			});

			it('Specific entropy (s) is correct', function() {
				expect(+result.s.toFixed(8)).toEqual(2.58041912);
			});

			it('Specific isobaric heat capacity (Cp) is correct', function() {
				expect(+result.cp.toFixed(8)).toEqual(4.65580682);
			});

			it('Speed of sound (w) is correct', function() {
				expect(+result.w.toFixed(5)).toEqual(1240.71337);
			});
		});
	});

	describe("PT Region 2", function() {

		describe("correct results for P = 0.0035 MPa, T = 300 K", function() {
			var result;

			beforeAll(function() {
				result = NeutriumJS.thermo.IAWPS97.PT.solve(0.0035, 300);
			});

			it('Specific gravity (v) is correct', function() {
				expect(+result.v.toFixed(7)).toEqual(39.4913866);
			});

			it('Specific enthalpy (h) is correct', function() {
				expect(+result.h.toFixed(5)).toEqual(2549.91145);
			});

			it('Specific internal energy (u) is correct', function() {
				expect(+result.u.toFixed(4)).toEqual(2411.6916);
			});

			it('Specific entropy (s) is correct', function() {
				expect(+result.s.toFixed(8)).toEqual(8.52238967);
			});

			it('Specific isobaric heat capacity (Cp) is correct', function() {
				expect(+result.cp.toFixed(8)).toEqual(1.91300162);
			});

			it('Speed of sound (w) is correct', function() {
				expect(+result.w.toFixed(6)).toEqual(427.920172);
			});
		});

		describe("correct results for P = 0.0035 MPa, T = 700 K", function() {
			var result;

			beforeAll(function() {
				result = NeutriumJS.thermo.IAWPS97.PT.solve(0.0035, 700);
			});

			it('Specific gravity (v) is correct', function() {
				expect(+result.v.toFixed(7)).toEqual(92.3015898);
			});

			it('Specific enthalpy (h) is correct', function() {
				expect(+result.h.toFixed(5)).toEqual(3335.68375);
			});

			it('Specific internal energy (u) is correct', function() {
				expect(+result.u.toFixed(5)).toEqual(3012.62819);
			});

			it('Specific entropy (s) is correct', function() {
				expect(+result.s.toFixed(7)).toEqual(10.1749996);
			});

			it('Specific isobaric heat capacity (Cp) is correct', function() {
				expect(+result.cp.toFixed(8)).toEqual(2.08141274);
			});

			it('Speed of sound (w) is correct', function() {
				expect(+result.w.toFixed(6)).toEqual(644.289068);
			});
		});

		describe("correct results for P = 30 MPa, T = 700 K", function() {
			var result;

			beforeAll(function() {
				result = NeutriumJS.thermo.IAWPS97.PT.solve(30, 700);
			});

			it('Specific gravity (v) is correct', function() {
				expect(+result.v.toFixed(11)).toEqual(0.00542946619);
			});

			it('Specific enthalpy (h) is correct', function() {
				expect(+result.h.toFixed(5)).toEqual(2631.49474);
			});

			it('Specific internal energy (u) is correct', function() {
				expect(+result.u.toFixed(5)).toEqual(2468.61076);
			});

			it('Specific entropy (s) is correct', function() {
				expect(+result.s.toFixed(8)).toEqual(5.17540298);
			});

			it('Specific isobaric heat capacity (Cp) is correct', function() {
				expect(+result.cp.toFixed(7)).toEqual(10.3505092);
			});

			it('Speed of sound (w) is correct', function() {
				expect(+result.w.toFixed(6)).toEqual(480.386523);
			});
		});
	});

	describe("PT Region 3", function() {

		describe("subregion boundary equations", function() {

			it('T_3ab(P) for P = 40 MPa is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.b3ab_P_T(40).toFixed(7)).toEqual(693.0341408);
			});

			it('T_3cd(P) for P = 25 MPa is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.b3cd_P_T(25).toFixed(7)).toEqual(649.3659208);
			});

			it('T_3ef(P) for P = 40 MPa is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.b3ef_P_T(40).toFixed(7)).toEqual(713.9593992);
			});

			it('T_3gh(P) for P = 23 MPa is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.b3gh_P_T(23).toFixed(7)).toEqual(649.8873759);
			});

			it('T_3ij(P) for P = 23 MPa is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.b3ij_P_T(23).toFixed(7)).toEqual(651.5778091);
			});

			it('T_3jk(P) for P = 23 MPa is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.b3jk_P_T(23).toFixed(7)).toEqual(655.8338344);
			});

			it('T_3mn(P) for P = 22.8 MPa is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.b3mn_P_T(22.8).toFixed(7)).toEqual(649.6054133);
			});

			it('T_3op(P) for P = 22.8 MPa is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.b3op_P_T(22.8).toFixed(7)).toEqual(650.0106943);
			});

			it('T_3qu(P) for P = 22 MPa is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.b3qu_P_T(22).toFixed(7)).toEqual(645.6355027);
			});

			it('T_3rx(P) for P = 22 MPa is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.b3rx_P_T(22).toFixed(7)).toEqual(648.2622754);
			});

			it('T_3uv(P) for P = 22.3 MPa is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.b3uv_P_T(22.3).toFixed(7)).toEqual(647.7996121);
			});

			it('T_3wx(P) for P = 22.3 MPa is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.b3wx_P_T(22.3).toFixed(7)).toEqual(648.2049480);
			});
		});

		describe("specific volume equations", function() {

			it('v3a(P,T) for P = 50 MPa and T = 630K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(50, 630).v.toFixed(12)).toEqual(0.001470853100);
			});

			it('v3a(P,T) for P = 80 MPa and T = 670K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(80, 670).v.toFixed(12)).toEqual(0.001503831359);
			});

			it('v3b(P,T) for P = 50 MPa and T = 710K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(50, 710).v.toFixed(12)).toEqual(0.002204728587);
			});

			it('v3b(P,T) for P = 80 MPa and T = 750K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(80, 750).v.toFixed(12)).toEqual(0.001973692940);
			});

			it('v3c(P,T) for P = 20 MPa and T = 630 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(20, 630).v.toFixed(12)).toEqual(0.001761696406);
			});

			it('v3c(P,T) for P = 30 MPa and T = 650 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(30, 650).v.toFixed(12)).toEqual(0.001819560617);
			});

			it('v3d(P,T) for P = 26 MPa and T = 656 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(26, 656).v.toFixed(12)).toEqual(0.002245587720);
			});

			it('v3d(P,T) for P = 30 MPa and T = 670 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(30, 670).v.toFixed(12)).toEqual(0.002506897702);
			});

			it('v3e(P,T) for P = 26 MPa and T = 661 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(26, 661).v.toFixed(12)).toEqual(0.002970225962);
			});

			it('v3e(P,T) for P = 30 MPa and T = 675 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(30, 675).v.toFixed(12)).toEqual(0.003004627086);
			});

			it('v3f(P,T) for P = 26 MPa and T = 671 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(26, 671).v.toFixed(12)).toEqual(0.005019029401);
			});

			it('v3f(P,T) for P = 30 MPa and T = 690 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(30, 690).v.toFixed(12)).toEqual(0.004656470142);
			});

			it('v3g(P,T) for P = 23.6 MPa and T = 649 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(23.6, 649).v.toFixed(12)).toEqual(0.002163198378);
			});

			it('v3g(P,T) for P = 24 MPa and T = 650 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(24, 650).v.toFixed(12)).toEqual(0.002166044161);
			});

			it('v3h(P,T) for P = 23.6 MPa and T = 652 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(23.6, 652).v.toFixed(12)).toEqual(0.002651081407);
			});

			it('v3h(P,T) for P = 24 MPa and T = 654 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(24, 654).v.toFixed(12)).toEqual(0.002967802335);
			});

			it('v3i(P,T) for P = 23.6 MPa and T = 653 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(23.6, 653).v.toFixed(12)).toEqual(0.003273916816);
			});

			it('v3i(P,T) for P = 24 MPa and T = 655 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(24, 655).v.toFixed(12)).toEqual(0.003550329864);
			});

			it('v3j(P,T) for P = 23.5 MPa and T = 655 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(23.5, 655).v.toFixed(12)).toEqual(0.004545001142);
			});

			it('v3j(P,T) for P = 24 MPa and T = 660 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(24, 660).v.toFixed(12)).toEqual(0.005100267704);
			});

			it('v3k(P,T) for P = 23 MPa and T = 660 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(23, 660).v.toFixed(12)).toEqual(0.006109525997);
			});

			it('v3k(P,T) for P = 24 MPa and T = 670 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(24, 670).v.toFixed(12)).toEqual(0.006427325645);
			});

			it('v3l(P,T) for P = 22.6 MPa and T = 646 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(22.6, 646).v.toFixed(12)).toEqual(0.002117860851);
			});

			it('v3l(P,T) for P = 23 MPa and T = 646 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(23, 646).v.toFixed(12)).toEqual(0.002062374674);
			});

			it('v3m(P,T) for P = 22.6 MPa and T = 648.6 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(22.6, 648.6).v.toFixed(12)).toEqual(0.002533063780);
			});

			it('v3m(P,T) for P = 22.8 MPa and T = 649.3 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(22.8, 649.3).v.toFixed(12)).toEqual(0.002572971781);
			});

			it('v3n(P,T) for P = 22.6 MPa and T = 649 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(22.6, 649).v.toFixed(12)).toEqual(0.002923432711);
			});

			it('v3n(P,T) for P = 22.8 MPa and T = 649.7 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(22.8, 649.7).v.toFixed(12)).toEqual(0.002913311494);
			});

			it('v3o(P,T) for P = 22.6 MPa and T = 649.1 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(22.6, 649.1).v.toFixed(12)).toEqual(0.003131208996);
			});

			it('v3o(P,T) for P = 22.8 MPa and T = 649.9 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(22.8, 649.9).v.toFixed(12)).toEqual(0.003221160278);
			});

			it('v3p(P,T) for P = 22.6 MPa and T = 649.4 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(22.6, 649.4).v.toFixed(12)).toEqual(0.003715596186);
			});

			it('v3p(P,T) for P = 22.8 MPa and T = 650.2 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(22.8, 650.2).v.toFixed(12)).toEqual(0.003664754790);
			});

			it('v3q(P,T) for P = 21.1 MPa and T = 640 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(21.1, 640).v.toFixed(12)).toEqual(0.001970999272);
			});

			it('v3q(P,T) for P = 21.8 MPa and T = 643 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(21.8, 643).v.toFixed(12)).toEqual(0.002043919161);
			});

			it('v3r(P,T) for P = 21.1 MPa and T = 644 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(21.1, 644).v.toFixed(12)).toEqual(0.005251009921);
			});

			it('v3r(P,T) for P = 21.8 MPa and T = 648 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(21.8, 648).v.toFixed(12)).toEqual(0.005256844741);
			});

			it('v3s(P,T) for P = 19.1 MPa and T = 635 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(19.1, 635).v.toFixed(12)).toEqual(0.001932829079);
			});

			it('v3s(P,T) for P = 20 MPa and T = 638 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(20, 638).v.toFixed(12)).toEqual(0.001985387227);
			});

			it('v3t(P,T) for P = 17 MPa and T = 626 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(17, 626).v.toFixed(12)).toEqual(0.008483262001);
			});

			it('v3t(P,T) for P = 20 MPa and T = 640 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(20, 640).v.toFixed(12)).toEqual(0.006227528101);
			});

			it('v3u(P,T) for P = 21.5 MPa and T = 644.6 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(21.5, 644.6).v.toFixed(12)).toEqual(0.002268366647);
			});

			it('v3u(P,T) for P = 22 MPa and T = 646.1 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(22, 646.1).v.toFixed(12)).toEqual(0.002296350553);
			});

			it('v3v(P,T) for P = 22.5 MPa and T = 648.6 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(22.5, 648.6).v.toFixed(12)).toEqual(0.002832373260);
			});

			it('v3v(P,T) for P = 22.3 MPa and T = 647.9 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(22.3, 647.9).v.toFixed(12)).toEqual(0.002811424405);
			});

			it('v3w(P,T) for P = 22.15 MPa and T = 647.5 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(22.15, 647.5).v.toFixed(12)).toEqual(0.003694032281);
			});

			it('v3w(P,T) for P = 22.3 MPa and T = 648.1 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(22.3, 648.1).v.toFixed(12)).toEqual(0.003622226305);
			});

			it('v3x(P,T) for P = 22.11 MPa and T = 648.0 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(22.11, 648).v.toFixed(12)).toEqual(0.004528072649);
			});

			it('v3x(P,T) for P = 22.3 MPa and T = 649 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(22.3, 649).v.toFixed(12)).toEqual(0.004556905799);
			});

			it('v3y(P,T) for P = 22 MPa and T = 646.84 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(22, 646.84).v.toFixed(12)).toEqual(0.002698354719);
			});

			it('v3y(P,T) for P = 22.064 MPa and T = 647.05 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(22.064, 647.05).v.toFixed(12)).toEqual(0.002717655648);
			});

			it('v3z(P,T) for P = 22 MPa and T = 646.89 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(22, 646.89).v.toFixed(12)).toEqual(0.003798732962);
			});

			it('v3z(P,T) for P = 22.064 MPa and T = 647.15 K is correct', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r3(22.064, 647.15).v.toFixed(11)).toEqual(0.00370194001);
			});
		});

		describe("correct results for P = 25.5837018 MPa (calculated), T = 650 K, Rho = 500 kg/m^3", function() {
			var result;

			beforeAll(function() {
				result = NeutriumJS.thermo.IAWPS97.PT.solve(25.5837018, 650, 500);
			});

			it('Specific gravity (v) is correct', function() {
				expect(+result.v.toFixed(7)).toEqual(1/500);
			});

			it('Specific enthalpy (h) is correct', function() {
				expect(+result.h.toFixed(5)).toEqual(1863.43019);
			});

			it('Specific internal energy (u) is correct', function() {
				expect(+result.u.toFixed(5)).toEqual(1812.26279);
			});

			it('Specific entropy (s) is correct', function() {
				expect(+result.s.toFixed(8)).toEqual(4.05427273);
			});

			it('Specific isobaric heat capacity (Cp) is correct', function() {
				expect(+result.cp.toFixed(7)).toEqual(13.8935717);
			});

			it('Speed of sound (w) is correct', function() {
				expect(+result.w.toFixed(6)).toEqual(502.005554);
			});
		});

		describe("correct results for P = 22.2930643 MPa, T = 650 K, Rho = 200 kg/m^3", function() {
			var result;

			beforeAll(function() {
				result = NeutriumJS.thermo.IAWPS97.PT.solve(22.2930643, 650, 200);
			});

			it('Specific gravity (v) is correct', function() {
				expect(+result.v.toFixed(7)).toEqual(1/200);
			});

			it('Specific enthalpy (h) is correct', function() {
				expect(+result.h.toFixed(5)).toEqual(2375.12401);
			});

			it('Specific internal energy (u) is correct', function() {
				expect(+result.u.toFixed(5)).toEqual(2263.65868);
			});

			it('Specific entropy (s) is correct', function() {
				expect(+result.s.toFixed(8)).toEqual(4.85438792);
			});

			it('Specific isobaric heat capacity (Cp) is correct', function() {
				expect(+result.cp.toFixed(7)).toEqual(44.6579342);
			});

			it('Speed of sound (w) is correct', function() {
				expect(+result.w.toFixed(6)).toEqual(383.444594);
			});
		});

		describe("correct results for P = 78.3095639 MPa, T = 750 K, Rho = 500 kg/m^3", function() {
			var result;

			beforeAll(function() {
				result = NeutriumJS.thermo.IAWPS97.PT.solve(78.3095639, 750, 500);
			});

			it('Specific gravity (v) is correct', function() {
				expect(+result.v.toFixed(11)).toEqual(1/500);
			});

			it('Specific enthalpy (h) is correct', function() {
				expect(+result.h.toFixed(5)).toEqual(2258.68845);
			});

			it('Specific internal energy (u) is correct', function() {
				expect(+result.u.toFixed(5)).toEqual(2102.06932);
			});

			it('Specific entropy (s) is correct', function() {
				expect(+result.s.toFixed(8)).toEqual(4.46971906);
			});

			it('Specific isobaric heat capacity (Cp) is correct', function() {
				expect(+result.cp.toFixed(8)).toEqual(6.34165359);
			});

			it('Speed of sound (w) is correct', function() {
				expect(+result.w.toFixed(6)).toEqual(760.696041);
			});
		});
	});

	describe("PT Region 4", function() {

		describe("saturation pressure equation Psat(T)", function() {

			it('Saturation pressure is correct for T = 300K', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r4_T_Psat(300).toFixed(11)).toEqual(0.00353658941);
			});

			it('Saturation pressure is correct for T = 500K', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r4_T_Psat(500).toFixed(8)).toEqual(2.63889776);
			});

			it('Saturation pressure is correct for T = 600K', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r4_T_Psat(600).toFixed(7)).toEqual(12.3443146);
			});

		});

		describe("saturation temperature equation Tsat(P)", function() {

			it('Saturation pressure is correct for P = 0.1 MPa', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r4_P_Tsat(0.1).toFixed(6)).toEqual(372.755919);
			});

			it('Saturation pressure is correct for P = 1 MPa', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r4_P_Tsat(1).toFixed(6)).toEqual(453.035632);
			});

			it('Saturation pressure is correct for P = 10 MPa', function() {
				expect(+NeutriumJS.thermo.IAWPS97.PT.r4_P_Tsat(10).toFixed(6)).toEqual(584.149488);
			});
		});

		describe("correct results for P = 25.5837018 MPa (calculated), T = 650 K, Rho = 500 kg/m^3", function() {
			var result;

			beforeAll(function() {
				result = NeutriumJS.thermo.IAWPS97.PT.solve(25.5837018, 650, 500);
			});

			it('Specific gravity (v) is correct', function() {
				expect(+result.v.toFixed(7)).toEqual(1/500);
			});

			it('Specific enthalpy (h) is correct', function() {
				expect(+result.h.toFixed(5)).toEqual(1863.43019);
			});

			it('Specific internal energy (u) is correct', function() {
				expect(+result.u.toFixed(5)).toEqual(1812.26279);
			});

			it('Specific entropy (s) is correct', function() {
				expect(+result.s.toFixed(8)).toEqual(4.05427273);
			});

			it('Specific isobaric heat capacity (Cp) is correct', function() {
				expect(+result.cp.toFixed(7)).toEqual(13.8935717);
			});

			it('Speed of sound (w) is correct', function() {
				expect(+result.w.toFixed(6)).toEqual(502.005554);
			});
		});

		describe("correct results for P = 22.2930643 MPa, T = 650 K, Rho = 200 kg/m^3", function() {
			var result;

			beforeAll(function() {
				result = NeutriumJS.thermo.IAWPS97.PT.solve(22.2930643, 650, 200);
			});

			it('Specific gravity (v) is correct', function() {
				expect(+result.v.toFixed(7)).toEqual(1/200);
			});

			it('Specific enthalpy (h) is correct', function() {
				expect(+result.h.toFixed(5)).toEqual(2375.12401);
			});

			it('Specific internal energy (u) is correct', function() {
				expect(+result.u.toFixed(5)).toEqual(2263.65868);
			});

			it('Specific entropy (s) is correct', function() {
				expect(+result.s.toFixed(8)).toEqual(4.85438792);
			});

			it('Specific isobaric heat capacity (Cp) is correct', function() {
				expect(+result.cp.toFixed(7)).toEqual(44.6579342);
			});

			it('Speed of sound (w) is correct', function() {
				expect(+result.w.toFixed(6)).toEqual(383.444594);
			});
		});

		describe("correct results for P = 78.3095639 MPa, T = 750 K, Rho = 500 kg/m^3", function() {
			var result;

			beforeAll(function() {
				result = NeutriumJS.thermo.IAWPS97.PT.solve(78.3095639, 750, 500);
			});

			it('Specific gravity (v) is correct', function() {
				expect(+result.v.toFixed(11)).toEqual(1/500);
			});

			it('Specific enthalpy (h) is correct', function() {
				expect(+result.h.toFixed(5)).toEqual(2258.68845);
			});

			it('Specific internal energy (u) is correct', function() {
				expect(+result.u.toFixed(5)).toEqual(2102.06932);
			});

			it('Specific entropy (s) is correct', function() {
				expect(+result.s.toFixed(8)).toEqual(4.46971906);
			});

			it('Specific isobaric heat capacity (Cp) is correct', function() {
				expect(+result.cp.toFixed(8)).toEqual(6.34165359);
			});

			it('Speed of sound (w) is correct', function() {
				expect(+result.w.toFixed(6)).toEqual(760.696041);
			});
		});
	});

	describe("NeutriumJS.thermo.IAWPS97 PT Region 5", function() {

		describe("correct results for P = 0.5 MPa, T = 1500 K", function() {
			var result;

			beforeAll(function() {
				result = NeutriumJS.thermo.IAWPS97.PT.solve(0.5, 1500);
			});

			it('Specific gravity (v) is correct', function() {
				expect(+result.v.toFixed(7)).toEqual(1.3845509);
			});

			it('Specific enthalpy (h) is correct', function() {
				expect(+result.h.toFixed(5)).toEqual(5219.76855);
			});

			it('Specific internal energy (u) is correct', function() {
				expect(+result.u.toFixed(4)).toEqual(4527.4931);
			});

			it('Specific entropy (s) is correct', function() {
				expect(+result.s.toFixed(8)).toEqual(9.65408875);
			});

			it('Specific isobaric heat capacity (Cp) is correct', function() {
				expect(+result.cp.toFixed(8)).toEqual(2.61609445);
			});

			it('Speed of sound (w) is correct', function() {
				expect(+result.w.toFixed(5)).toEqual(917.06869);
			});
		});

		describe("correct results for P = 30 MPa, T = 1500 K", function() {
			var result;

			beforeAll(function() {
				result = NeutriumJS.thermo.IAWPS97.PT.solve(30, 1500);
			});

			it('Specific gravity (v) is correct', function() {
				expect(+result.v.toFixed(10)).toEqual(0.0230761299);
			});

			it('Specific enthalpy (h) is correct', function() {
				expect(+result.h.toFixed(5)).toEqual(5167.23514);
			});

			it('Specific internal energy (u) is correct', function() {
				expect(+result.u.toFixed(5)).toEqual(4474.95124);
			});

			it('Specific entropy (s) is correct', function() {
				expect(+result.s.toFixed(8)).toEqual(7.72970133);
			});

			it('Specific isobaric heat capacity (Cp) is correct', function() {
				expect(+result.cp.toFixed(8)).toEqual(2.72724317);
			});

			it('Speed of sound (w) is correct', function() {
				expect(+result.w.toFixed(6)).toEqual(928.548002);
			});
		});

		describe("correct results for P = 30 MPa, T = 2000 K", function() {
			var result;

			beforeAll(function() {
				result = NeutriumJS.thermo.IAWPS97.PT.solve(30, 2000);
			});

			it('Specific gravity (v) is correct', function() {
				expect(+result.v.toFixed(10)).toEqual(0.0311385219);
			});

			it('Specific enthalpy (h) is correct', function() {
				expect(+result.h.toFixed(5)).toEqual(6571.22604);
			});

			it('Specific internal energy (u) is correct', function() {
				expect(+result.u.toFixed(5)).toEqual(5637.07038);
			});

			it('Specific entropy (s) is correct', function() {
				expect(+result.s.toFixed(8)).toEqual(8.53640523);
			});

			it('Specific isobaric heat capacity (Cp) is correct', function() {
				expect(+result.cp.toFixed(8)).toEqual(2.88569882);
			});

			it('Speed of sound (w) is correct', function() {
				expect(+result.w.toFixed(5)).toEqual(1067.36948);
			});
		});
	});
});