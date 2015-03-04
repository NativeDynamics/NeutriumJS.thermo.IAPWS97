describe("NeutriumJS.Steam Pressure-Enthalpy equations", function() {
	describe("PH Region 1", function() {

		describe("correct results for P = 3 MPa, h = 500 kJ/kg", function() {
			var result;

			beforeAll(function() {
				result = NeutriumJS.Steam.PH(3, 500);
			});

			it('Temperature (T) is correct', function() {
				expect(+result.T.toFixed(6)).toEqual(391.798509);
			});
		});

		describe("correct results for P = 80 MPa, h = 500 kJ/kg", function() {
			var result;

			beforeAll(function() {
				result = NeutriumJS.Steam.PH(80, 500);
			});

			it('Temperature (T) is correct', function() {
				expect(+result.T.toFixed(6)).toEqual(378.108626);
			});
		});

		describe("correct results for P = 80 MPa, h = 1500 kJ/kg", function() {
			var result;

			beforeAll(function() {
				result = NeutriumJS.Steam.PH(80, 1500);
			});

			it('Temperature (T) is correct', function() {
				expect(+result.T.toFixed(6)).toEqual(611.041229);
			});
		});
	});

	describe("PH Region 2", function() {

		describe("PH Region 2 boundary equations", function() {
			it('Boundary 2bc equation h = 3516.004323 kJ/kg', function() {
				expect(+NeutriumJS.Steam.b2bc_H_P(3516.004323).toFixed(6)).toEqual(100);
			});

			it('Boundary 2bc equation P = 100 MPa', function() {
				expect(+NeutriumJS.Steam.b2bc_P_H(100).toFixed(6)).toEqual(3516.004323);
			});
		});

		describe("PH Region 2a", function() {

			describe("correct results for P = 0.001 MPa, h = 3000 kJ/kg", function() {
				var result;

				beforeAll(function() {
					result = NeutriumJS.Steam.PH(0.001, 3000);
				});

				it('Temperature (T) is correct', function() {
					expect(+result.T.toFixed(6)).toEqual(534.433241);
				});
			});

			describe("correct results for P = 3 MPa, h = 3000 kJ/kg", function() {
				var result;

				beforeAll(function() {
					result = NeutriumJS.Steam.PH(3, 3000);
				});

				it('Temperature (T) is correct', function() {
					expect(+result.T.toFixed(5)).toEqual(575.37337);
				});
			});

			describe("correct results for P = 3 MPa, h = 4000 kJ/kg", function() {
				var result;

				beforeAll(function() {
					result = NeutriumJS.Steam.PH(3, 4000);
				});

				it('Temperature (T) is correct', function() {
					expect(+result.T.toFixed(5)).toEqual(1010.77577);
				});
			});
		});

		describe("PH Region 2b", function() {

			describe("correct results for P = 5 MPa, h = 3500 kJ/kg", function() {
				var result;

				beforeAll(function() {
					result = NeutriumJS.Steam.PH(5, 3500);
				});

				it('Temperature (T) is correct', function() {
					expect(+result.T.toFixed(6)).toEqual(801.299102);
				});
			});

			describe("correct results for P = 5 MPa, h = 4000 kJ/kg", function() {
				var result;

				beforeAll(function() {
					result = NeutriumJS.Steam.PH(5, 4000);
				});

				it('Temperature (T) is correct', function() {
					expect(+result.T.toFixed(5)).toEqual(1015.31583);
				});
			});

			describe("correct results for P = 25 MPa, h = 3500 kJ/kg", function() {
				var result;

				beforeAll(function() {
					result = NeutriumJS.Steam.PH(25, 3500);
				});

				it('Temperature (T) is correct', function() {
					expect(+result.T.toFixed(6)).toEqual(875.279054);
				});
			});
		});

		describe("PH Region 2c", function() {

			describe("correct results for P = 40 MPa, h = 2700 kJ/kg", function() {
				var result;

				beforeAll(function() {
					result = NeutriumJS.Steam.PH(40, 2700);
				});

				it('Temperature (T) is correct', function() {
					expect(+result.T.toFixed(6)).toEqual(743.056411);
				});
			});

			describe("correct results for P = 60 MPa, h = 2700 kJ/kg", function() {
				var result;

				beforeAll(function() {
					result = NeutriumJS.Steam.PH(60, 2700);
				});

				it('Temperature (T) is correct', function() {
					expect(+result.T.toFixed(6)).toEqual(791.137067);
				});
			});

			describe("correct results for P = 60 MPa, h = 3200 kJ/kg", function() {
				var result;

				beforeAll(function() {
					result = NeutriumJS.Steam.PH(60, 3200);
				});

				it('Temperature (T) is correct', function() {
					expect(+result.T.toFixed(5)).toEqual(882.75686);
				});
			});
		});
	});

	describe("NeutriumJS.Steam PH Region 3", function() {

		describe("PH Region 3 boundary equations", function() {
			it('Boundary 3ab equation P = 25 MPa', function() {
				expect(+NeutriumJS.Steam.b3ab_P_H(25).toFixed(6)).toEqual(2095.936454);
			});
		});

		describe("PH Region 3a", function() {

			describe("correct results for P = 20 MPa, h = 1700 kJ/kg", function() {
				var result, v;

				beforeAll(function() {
					result = NeutriumJS.Steam.PH(20, 1700);
					v = NeutriumJS.Steam.r3A_PH_V(20, 1700);
				});

				it('Temperature (T) is correct', function() {
					expect(+result.T.toFixed(7)).toEqual(629.3083892);
				});

				it('Specific gravity (v) is correct', function() {
					expect(+v.toFixed(12)).toEqual(0.001749903962);
				});
			});

			describe("correct results for P = 50 MPa, h = 2000 kJ/kg", function() {
				var result, v;

				beforeAll(function() {
					result = NeutriumJS.Steam.PH(50, 2000);
					v = NeutriumJS.Steam.r3A_PH_V(50, 2000);
				});

				it('Temperature (T) is correct', function() {
					expect(+result.T.toFixed(7)).toEqual(690.5718338);
				});

				it('Specific gravity (v) is correct', function() {
					expect(+v.toFixed(12)).toEqual(0.001908139035);
				});
			});

			describe("correct results for P = 100 MPa, h = 2100 kJ/kg", function() {
				var result, v;

				beforeAll(function() {
					result = NeutriumJS.Steam.PH(100, 2100);
					v = NeutriumJS.Steam.r3A_PH_V(100, 2100);
				});

				it('Temperature (T) is correct', function() {
					expect(+result.T.toFixed(7)).toEqual(733.6163014);
				});

				it('Specific gravity (v) is correct', function() {
					expect(+v.toFixed(12)).toEqual(0.001676229776);
				});
			});
		});

		describe("PH Region 3b", function() {

			describe("correct results for P = 20 MPa, h = 2500 kJ/kg", function() {
				var result, v;

				beforeAll(function() {
					result = NeutriumJS.Steam.PH(20, 2500);
					v = NeutriumJS.Steam.r3B_PH_V(20, 2500);
				});

				it('Temperature (T) is correct', function() {
					expect(+result.T.toFixed(7)).toEqual(641.8418053);
				});

				it('Specific gravity (v) is correct', function() {
					expect(+v.toFixed(12)).toEqual(0.006670547043);
				});
			});

			describe("correct results for P = 50 MPa, h = 2400 kJ/kg", function() {
				var result, v;

				beforeAll(function() {
					result = NeutriumJS.Steam.PH(50, 2400);
					v = NeutriumJS.Steam.r3B_PH_V(50, 2400);
				});

				it('Temperature (T) is correct', function() {
					expect(+result.T.toFixed(7)).toEqual(735.1848618);
				});

				it('Specific gravity (v) is correct', function() {
					expect(+v.toFixed(12)).toEqual(0.002801244590);
				});
			});

			describe("correct results for P = 100 MPa, h = 2700 kJ/kg", function() {
				var result;

				beforeAll(function() {
					result = NeutriumJS.Steam.PH(100, 2700);
					v = NeutriumJS.Steam.r3B_PH_V(100, 2700);
				});

				it('Temperature (T) is correct', function() {
					expect(+result.T.toFixed(7)).toEqual(842.0460876);
				});

				it('Specific gravity (v) is correct', function() {
					expect(+v.toFixed(12)).toEqual(0.002404234998);
				});
			});

		});
	});

	describe("PH Region 4", function() {

		describe("P_3sat(h) ", function() {

			it('h = 1700 kJ/kg is correct', function() {
				expect(+NeutriumJS.Steam.r4_H_Psat(1700).toFixed(8)).toEqual(17.24175718);
			});

			it('h = 2000 kJ/kg is correct', function() {
				expect(+NeutriumJS.Steam.r4_H_Psat(2000).toFixed(8)).toEqual(21.93442957);
			});

			it('h = 2400 kJ/kg is correct', function() {
				expect(+NeutriumJS.Steam.r4_H_Psat(2400).toFixed(8)).toEqual(20.18090839);
			});
		});

	});
});

