describe("NeutriumJS.Steam Pressure-Entropy equations", function() {

	describe("PS Region 1", function() {

		describe("correct results for P = 3 MPa, s = 0.5 kJ/kg.K", function() {
			var result;

			beforeAll(function() {
				result = NeutriumJS.Steam.PS.solve(3, 0.5);
			});

			it('Temperature (T) is correct', function() {
				expect(+result.T.toFixed(6)).toEqual(307.842258);
			});
		});

		describe("correct results for P = 80 MPa, s = 0.5 kJ/kg.K", function() {
			var result;

			beforeAll(function() {
				result = NeutriumJS.Steam.PS.solve(80, 0.5);
			});

			it('Temperature (T) is correct', function() {
				expect(+result.T.toFixed(6)).toEqual(309.979785);
			});
		});

		describe("correct results for P = 80 MPa, s = 3 kJ/kg.K", function() {
			var result;

			beforeAll(function() {
				result = NeutriumJS.Steam.PS.solve(80, 3);
			});

			it('Temperature (T) is correct', function() {
				expect(+result.T.toFixed(6)).toEqual(565.899909);
			});
		});
	});

	describe("NeutriumJS.Steam PS Region 2", function() {
		describe("PS Region 2a", function() {

			describe("correct results for P = 0.1 MPa, s = 7.5 kJ/kg.K", function() {
				var result;

				beforeAll(function() {
					result = NeutriumJS.Steam.PS.solve(0.1, 7.5);
				});

				it('Temperature (T) is correct', function() {
					expect(+result.T.toFixed(6)).toEqual(399.517097);
				});
			});

			describe("correct results for P = 0.1 MPa, s = 8 kJ/kg.K", function() {
				var result;

				beforeAll(function() {
					result = NeutriumJS.Steam.PS.solve(0.1, 8);
				});

				it('Temperature (T) is correct', function() {
					expect(+result.T.toFixed(6)).toEqual(514.127082);	// IAPWS check value is 514.127082 assumed to be a calculation error, to 15 sif figures that calculated value is 514.127081500116
				});
			});

			describe("correct results for P = 2.5 MPa, s = 8 kJ/kg.K", function() {
				var result;

				beforeAll(function() {
					result = NeutriumJS.Steam.PS.solve(2.5, 8);
				});

				it('Temperature (T) is correct', function() {
					expect(+result.T.toFixed(5)).toEqual(1039.84917);
				});
			});
		});

		describe("PS Region 2b", function() {

			describe("correct results for P = 8 MPa, s = 6 kJ/kg.K", function() {
				var result;

				beforeAll(function() {
					result = NeutriumJS.Steam.PS.solve(8, 6);
				});

				it('Temperature (T) is correct', function() {
					expect(+result.T.toFixed(5)).toEqual(600.48404);
				});
			});

			describe("correct results for P = 8 MPa, s = 7.5 kJ/kg.K", function() {
				var result;

				beforeAll(function() {
					result = NeutriumJS.Steam.PS.solve(8, 7.5);
				});

				it('Temperature (T) is correct', function() {
					expect(+result.T.toFixed(5)).toEqual(1064.95556);
				});
			});

			describe("correct results for P = 90 MPa, s = 6 kJ/kg.K", function() {
				var result;

				beforeAll(function() {
					result = NeutriumJS.Steam.PS.solve(90, 6);
				});

				it('Temperature (T) is correct', function() {
					expect(+result.T.toFixed(5)).toEqual(1038.01126);
				});
			});
		});

		describe("PS Region 2c", function() {

			describe("correct results for P = 20 MPa, s = 5.75 kJ/kg.K", function() {
				var result;

				beforeAll(function() {
					result = NeutriumJS.Steam.PS.solve(20, 5.75);
				});

				it('Temperature (T) is correct', function() {
					expect(+result.T.toFixed(6)).toEqual(697.992849);
				});
			});

			describe("correct results for P = 80 MPa, s = 5.25 kJ/kg.K", function() {
				var result;

				beforeAll(function() {
					result = NeutriumJS.Steam.PS.solve(80, 5.25);
				});

				it('Temperature (T) is correct', function() {
					expect(+result.T.toFixed(6)).toEqual(854.011484);
				});
			});

			describe("correct results for P = 80 MPa, s = 5.75 kJ/kg.K", function() {
				var result;

				beforeAll(function() {
					result = NeutriumJS.Steam.PS.solve(80, 5.75);
				});

				it('Temperature (T) is correct', function() {
					expect(+result.T.toFixed(6)).toEqual(949.017998);
				});
			});
		});
	});

	describe("NeutriumJS.Steam PS Region 3", function() {
		describe("PS Region 3a", function() {

			describe("correct results for P = 20 MPa, s = 3.8 kJ/kg.K", function() {
				var result, T;

				beforeAll(function() {
					result = NeutriumJS.Steam.PS.solve(20, 3.8);
					T = NeutriumJS.Steam.PS.r3A_PS_V(20, 3.8);
				});

				it('Temperature (T) is correct', function() {
					expect(+result.T.toFixed(7)).toEqual(628.2959869);
				});

				it('Specific gravity (v) is correct', function() {
					expect(+T.toFixed(12)).toEqual(0.001733791463);
				});
			});

			describe("correct results for P = 50 MPa, s = 3.6 kJ/kg.K", function() {
				var result, T;

				beforeAll(function() {
					result = NeutriumJS.Steam.PS.solve(50, 3.6);
					T = NeutriumJS.Steam.PS.r3A_PS_V(50, 3.6);
				});

				it('Temperature (T) is correct', function() {
					expect(+result.T.toFixed(7)).toEqual(629.7158726);	// IAPWS check value is 514.127082 assumed to be a calculation error, to 15 sif figures that calculated value is 514.127081500116
				});

				it('Specific gravity (v) is correct', function() {
					expect(+T.toFixed(12)).toEqual(0.001469680170);
				});
			});

			describe("correct results for P = 100 MPa, s = 4 kJ/kg.K", function() {
				var result, T;

				beforeAll(function() {
					result = NeutriumJS.Steam.PS.solve(100, 4);
					T = NeutriumJS.Steam.PS.r3A_PS_V(100, 4);
				});

				it('Temperature (T) is correct', function() {
					expect(+result.T.toFixed(7)).toEqual(705.6880237);
				});

				it('Specific gravity (v) is correct', function() {
					expect(+T.toFixed(12)).toEqual(0.001555893131);
				});
			});
		});

		describe("PS Region 3b", function() {
			describe("correct results for P = 20 MPa, s = 5 kJ/kg.K", function() {
				var result, T;

				beforeAll(function() {
					result = NeutriumJS.Steam.PS.solve(20, 5);
					T = NeutriumJS.Steam.PS.r3B_PS_V(20, 5);
				});

				it('Temperature (T) is correct', function() {
					expect(+result.T.toFixed(7)).toEqual(640.1176443);
				});

				it('Specific gravity (v) is correct', function() {
					expect(+T.toFixed(12)).toEqual(0.006262101987);
				});
			});

			describe("correct results for P = 50 MPa, s = 4.5 kJ/kg.K", function() {
				var result, T;

				beforeAll(function() {
					result = NeutriumJS.Steam.PS.solve(50, 4.5);
					T = NeutriumJS.Steam.PS.r3B_PS_V(50, 4.5);
				});

				it('Temperature (T) is correct', function() {
					expect(+result.T.toFixed(7)).toEqual(716.3687517);
				});

				it('Specific gravity (v) is correct', function() {
					expect(+T.toFixed(12)).toEqual(0.002332634294);
				});
			});

			describe("correct results for P = 100 MPa, s = 5 kJ/kg.K", function() {
				var result, T;

				beforeAll(function() {
					result = NeutriumJS.Steam.PS.solve(100, 5);
					T = NeutriumJS.Steam.PS.r3B_PS_V(100, 5);
				});

				it('Temperature (T) is correct', function() {
					expect(+result.T.toFixed(7)).toEqual(847.4332825);
				});

				it('Specific gravity (v) is correct', function() {
					expect(+T.toFixed(12)).toEqual(0.002449610757);
				});
			});
		});
	});

});

