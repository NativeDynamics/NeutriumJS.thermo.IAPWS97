describe("NeutriumJS.Steam additional properties", function() {
	describe("Viscosity", function() {

		it('correct for T = 298.15 K and rho = 998 kg/m^3', function() {
			expect(+NeutriumJS.Steam.viscosity(298.15, 998).toFixed(6)).toEqual(889.735100);
		});

		it('correct for T = 298.15 K and rho = 1200 kg/m^3', function() {
			expect(+NeutriumJS.Steam.viscosity(298.15, 1200).toFixed(6)).toEqual(1437.649467);
		});

		it('correct for T = 373.15 K and rho = 1000 kg/m^3', function() {
			expect(+NeutriumJS.Steam.viscosity(373.15, 1000).toFixed(6)).toEqual(307.883622);
		});

		it('correct for T = 433.15 K and rho = 1 kg/m^3', function() {
			expect(+NeutriumJS.Steam.viscosity(433.15, 1).toFixed(6)).toEqual(14.538324);
		});

		it('correct for T = 433.15 K and rho = 1000 kg/m^3', function() {
			expect(+NeutriumJS.Steam.viscosity(433.15, 1000).toFixed(6)).toEqual(217.685358);
		});

		it('correct for T = 873.15 K and rho = 1 kg/m^3', function() {
			expect(+NeutriumJS.Steam.viscosity(873.15, 1).toFixed(6)).toEqual(32.619287);
		});

		it('correct for T = 873.15 K and rho = 100 kg/m^3', function() {
			expect(+NeutriumJS.Steam.viscosity(873.15, 100).toFixed(6)).toEqual(35.802262);
		});

		it('correct for T = 873.15 K and rho = 600 kg/m^3', function() {
			expect(+NeutriumJS.Steam.viscosity(873.15, 600).toFixed(6)).toEqual(77.430195);
		});

		it('correct for T = 1173.15 K and rho = 1 kg/m^3', function() {
			expect(+NeutriumJS.Steam.viscosity(1173.15, 1).toFixed(6)).toEqual(44.217245);
		});

		it('correct for T = 1173.15 K and rho = 100 kg/m^3', function() {
			expect(+NeutriumJS.Steam.viscosity(1173.15, 100).toFixed(6)).toEqual(47.640433);
		});

		it('correct for T = 1173.15 K and rho = 400 kg/m^3', function() {
			expect(+NeutriumJS.Steam.viscosity(1173.15, 400).toFixed(6)).toEqual(64.154608);
		});
	});

	describe("Thermal Conductivity", function() {
		it('correct for T = 298.15 K and rho = 0 kg/m^3', function() {
			expect(+NeutriumJS.Steam.thermal_conductivity(298.15, 0).toFixed(7)).toEqual(18.4341883);
		});

		it('correct for T = 298.15 K and rho = 998 kg/m^3', function() {
			expect(+NeutriumJS.Steam.thermal_conductivity(298.15, 998).toFixed(6)).toEqual(607.712868);
		});

		it('correct for T = 298.15 K and rho = 1200 kg/m^3', function() {
			expect(+NeutriumJS.Steam.thermal_conductivity(298.15, 1200).toFixed(6)).toEqual(799.038144);
		});

		it('correct for T = 873.15 K and rho = 0 kg/m^3', function() {
			expect(+NeutriumJS.Steam.thermal_conductivity(873.15, 0).toFixed(7)).toEqual(79.1034659);
		});
	});

	describe("Surface Tension", function() {
		it('correct for T = 273.16 K', function() {
			expect(+NeutriumJS.Steam.surface_tension(273.16).toFixed(2)).toEqual(75.65);
		});

		it('correct for T = 278.15 K', function() {
			expect(+NeutriumJS.Steam.surface_tension(278.15).toFixed(2)).toEqual(74.94);
		});

		it('correct for T = 283.15 K', function() {
			expect(+NeutriumJS.Steam.surface_tension(283.15).toFixed(2)).toEqual(74.22);
		});

		it('correct for T = 288.15 K', function() {
			expect(+NeutriumJS.Steam.surface_tension(288.15).toFixed(2)).toEqual(73.49);
		});

		it('correct for T = 293.15 K', function() {
			expect(+NeutriumJS.Steam.surface_tension(293.15).toFixed(2)).toEqual(72.74);
		});

		it('correct for T = 298.15 K', function() {
			expect(+NeutriumJS.Steam.surface_tension(298.15).toFixed(2)).toEqual(71.97);
		});

		it('correct for T = 303.15 K', function() {
			expect(+NeutriumJS.Steam.surface_tension(303.15).toFixed(2)).toEqual(71.19);
		});

		// Above 30C only test every 50C increment
		it('correct for T = 323.15 K', function() {
			expect(+NeutriumJS.Steam.surface_tension(323.15).toFixed(2)).toEqual(67.94);
		});

		it('correct for T = 373.15 K', function() {
			expect(+NeutriumJS.Steam.surface_tension(373.15).toFixed(2)).toEqual(58.91);
		});

		it('correct for T = 423.15 K', function() {
			expect(+NeutriumJS.Steam.surface_tension(423.15).toFixed(2)).toEqual(48.74);
		});

		it('correct for T = 473.15 K', function() {
			expect(+NeutriumJS.Steam.surface_tension(473.15).toFixed(2)).toEqual(37.67);
		});

		it('correct for T = 523.15 K', function() {
			expect(+NeutriumJS.Steam.surface_tension(523.15).toFixed(2)).toEqual(26.04);
		});

		it('correct for T = 573.15 K', function() {
			expect(+NeutriumJS.Steam.surface_tension(573.15).toFixed(2)).toEqual(14.36);
		});

		it('correct for T = 623.15 K', function() {
			expect(+NeutriumJS.Steam.surface_tension(623.15).toFixed(2)).toEqual(3.67);
		});

		it('correct for T = 643.15 K', function() {
			expect(+NeutriumJS.Steam.surface_tension(643.15).toFixed(2)).toEqual(0.39);
		});
	});

	describe("Dielectric constant", function() {

		it('correct for P = 0.101325 MPa, T = 240 K', function() {
			expect(+NeutriumJS.Steam.dielectric_constant(240, 54.33701*18.015268).toFixed(5)).toEqual(104.34982);
		});

		it('correct for P = 0.101325 MPa, T = 300 K', function() {
			expect(+NeutriumJS.Steam.dielectric_constant(300, 55.31735*18.015268).toFixed(5)).toEqual(77.74735);
		});

		it('correct for P = 10 MPa, T = 300 K', function() {
			expect(+NeutriumJS.Steam.dielectric_constant(300, 55.56148*18.015268).toFixed(5)).toEqual(78.11269);
		});

		it('correct for P = 1000 MPa, T = 300 K', function() {
			expect(+NeutriumJS.Steam.dielectric_constant(300, 68.69265*18.015268).toFixed(4)).toEqual(103.6963); // Compounding rounding error at 5th decimal place (103.69632)
		});

		it('correct for P = 10 MPa, T = 650 K', function() {
			expect(+NeutriumJS.Steam.dielectric_constant(650, 2.24692*18.015268).toFixed(5)).toEqual(1.26715);
		});

		it('correct for P = 100 MPa, T = 650 K', function() {
			expect(+NeutriumJS.Steam.dielectric_constant(650, 40.31090*18.015268).toFixed(4)).toEqual(17.7173);	// Compounding rounding error at 5th decimal place (17.71733)
		});

		it('correct for P = 500 MPa, T = 650 K', function() {
			expect(+NeutriumJS.Steam.dielectric_constant(650, 52.58636*18.015268).toFixed(5)).toEqual(26.62132);
		});

		it('correct for P = 10 MPa, T = 870 K', function() {
			expect(+NeutriumJS.Steam.dielectric_constant(870, 1.45275*18.015268).toFixed(5)).toEqual(1.12721);
		});

		it('correct for P = 100 MPa, T = 870 K', function() {
			expect(+NeutriumJS.Steam.dielectric_constant(870, 20.98927*18.015268).toFixed(5)).toEqual(4.98281);
		});

		it('correct for P = 500 MPa, T = 870 K', function() {
			expect(+NeutriumJS.Steam.dielectric_constant(870, 45.01376*18.015268).toFixed(5)).toEqual(15.09746);
		});
	});

	describe("Ionisation constant", function() {

		it('correct for T = 240 K, ρ = 1 kg/m^3', function() {
			expect(+NeutriumJS.Steam.ionization_constant(300, 1).toFixed(6)).toEqual(13.906565);
		});

		it('correct for T = 600 K, ρ = 0.07 kg/m^3', function() {
			expect(+NeutriumJS.Steam.ionization_constant(600, 0.07).toFixed(6)).toEqual(21.048874);
		});

		it('correct for T = 600 K, ρ = 0.7 kg/m^3', function() {
			expect(+NeutriumJS.Steam.ionization_constant(600, 0.7).toFixed(6)).toEqual(11.203153);
		});

		it('correct for T = 800 K, ρ = 0.2 kg/m^3', function() {
			expect(+NeutriumJS.Steam.ionization_constant(800, 0.2).toFixed(6)).toEqual(15.089765);
		});

		it('correct for T = 800 K, ρ = 1.2 kg/m^3', function() {
			expect(+NeutriumJS.Steam.ionization_constant(800, 1.2).toFixed(6)).toEqual(6.438330);
		});
	});
});