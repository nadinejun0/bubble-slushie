document.addEventListener('DOMContentLoaded', function() {
    // DOM elements - adding null checks to prevent errors
    const doughTempInput = document.getElementById('dough-temp');
    const flourTypeSelect = document.getElementById('flour-type');
    const hydrationInput = document.getElementById('hydration');
    const starterPercentInput = document.getElementById('starter-percent');
    const calculateBtn = document.getElementById('calculate-btn');
    const bulkTimeElement = document.getElementById('bulk-time');
    const progressFill = document.getElementById('progress-fill');
    const progressPercent = document.getElementById('progress-percent');
    const sampleSizeElement = document.getElementById('sample-size');
    const roomTempInput = document.getElementById('room-temp');
    const flourTempInput = document.getElementById('flour-temp');
    const targetDoughTempInput = document.getElementById('target-dough-temp');
    const waterTempElement = document.getElementById('water-temp');
    const timelineContainer = document.getElementById('timeline-container');
    
    // Check if all required DOM elements exist before proceeding
    if (!doughTempInput || !flourTypeSelect || !hydrationInput || !starterPercentInput || 
        !calculateBtn || !bulkTimeElement || !progressFill || !progressPercent || 
        !sampleSizeElement || !timelineContainer) {
        console.error("Required DOM elements not found. Calculator initialization failed.");
        return;
    }
    
    // Always use Fahrenheit - toggle removed
    const isFahrenheit = true;

    // Aliquot method based on temperature - directly from the chart in sourdough-temp-chart.md
    const aliquotChart = [
        { tempF: 65, tempC: 18, targetRise: 100, timeMin: 12, timeMax: 16, sampleSize: 28 },
        { tempF: 66, tempC: 19, targetRise: 95, timeMin: 11.2, timeMax: 15.2, sampleSize: 29 },
        { tempF: 67, tempC: 19, targetRise: 90, timeMin: 10.4, timeMax: 14.4, sampleSize: 30 },
        { tempF: 68, tempC: 20, targetRise: 85, timeMin: 9.6, timeMax: 13.6, sampleSize: 30 },
        { tempF: 69, tempC: 21, targetRise: 80, timeMin: 8.8, timeMax: 12.8, sampleSize: 31 },
        { tempF: 70, tempC: 21, targetRise: 75, timeMin: 8, timeMax: 12, sampleSize: 32 },
        { tempF: 71, tempC: 22, targetRise: 70, timeMin: 7.4, timeMax: 11, sampleSize: 33 },
        { tempF: 72, tempC: 22, targetRise: 65, timeMin: 6.8, timeMax: 10, sampleSize: 34 },
        { tempF: 73, tempC: 23, targetRise: 60, timeMin: 6.2, timeMax: 9, sampleSize: 35 },
        { tempF: 74, tempC: 23, targetRise: 55, timeMin: 5.6, timeMax: 8, sampleSize: 36 },
        { tempF: 75, tempC: 24, targetRise: 50, timeMin: 5, timeMax: 7, sampleSize: 37 },
        { tempF: 76, tempC: 24, targetRise: 46, timeMin: 4.7, timeMax: 6.7, sampleSize: 38 },
        { tempF: 77, tempC: 25, targetRise: 42, timeMin: 4.4, timeMax: 6.4, sampleSize: 39 },
        { tempF: 78, tempC: 26, targetRise: 38, timeMin: 4.1, timeMax: 6.1, sampleSize: 41 },
        { tempF: 79, tempC: 26, targetRise: 34, timeMin: 3.8, timeMax: 5.8, sampleSize: 42 },
        { tempF: 80, tempC: 27, targetRise: 30, timeMin: 3.5, timeMax: 5.5, sampleSize: 43 },
        { tempF: 81, tempC: 27, targetRise: 28, timeMin: 3.3, timeMax: 5.2, sampleSize: 44 },
        { tempF: 82, tempC: 28, targetRise: 26, timeMin: 3.1, timeMax: 4.9, sampleSize: 44 },
        { tempF: 83, tempC: 28, targetRise: 24, timeMin: 2.9, timeMax: 4.6, sampleSize: 45 },
        { tempF: 84, tempC: 29, targetRise: 22, timeMin: 2.7, timeMax: 4.3, sampleSize: 45 },
        { tempF: 85, tempC: 29, targetRise: 20, timeMin: 2.5, timeMax: 4, sampleSize: 46 }
    ];

    // Recipe adjustment factors - simplified to only use hydration and starter percentage
    function getRecipeAdjustmentFactor(hydration, starterPercent, flourType) {
        try {
            // Default values if inputs are invalid
            hydration = !isNaN(hydration) ? hydration : 75;
            starterPercent = !isNaN(starterPercent) ? starterPercent : 20;
            flourType = flourType || 'bread';
            
            let factor = 1.0;
            const factorDetails = {
                base: 1.0,
                flourTypeFactor: 1.0,
                hydrationFactor: 1.0,
                starterFactor: 1.0
            };
            
            // Flour type adjustment
            if (flourType === 'whole-wheat') {
                factorDetails.flourTypeFactor = 0.85; // Whole wheat ferments faster
                factor *= factorDetails.flourTypeFactor;
            } else if (flourType === 'ap') {
                factorDetails.flourTypeFactor = 1.1; // AP flour ferments slower
                factor *= factorDetails.flourTypeFactor;
            }
            // bread flour is the baseline (1.0)
            
            // Hydration adjustment (higher = slightly faster)
            if (hydration > 80) {
                factorDetails.hydrationFactor = 0.95;
                factor *= factorDetails.hydrationFactor;
            } else if (hydration < 70) {
                factorDetails.hydrationFactor = 1.05;
                factor *= factorDetails.hydrationFactor;
            }
            
            // Starter percentage adjustment (higher = faster)
            if (starterPercent > 20) {
                factorDetails.starterFactor = 0.9;
                factor *= factorDetails.starterFactor;
            } else if (starterPercent < 15) {
                factorDetails.starterFactor = 1.1;
                factor *= factorDetails.starterFactor;
            }
            
            console.log("Adjustment factors:", {
                flourType,
                hydration,
                starterPercent,
                factors: factorDetails,
                finalFactor: factor
            });
            
            return factor;
        } catch (error) {
            console.error("Error calculating adjustment factor:", error);
            return 1.0; // Return default factor if there's an error
        }
    }

    // Find aliquot data based on temperature with interpolation - less restrictive
    function getAliquotData(tempC) {
        console.log("Getting aliquot data for temperature (C):", tempC);
        
        // Handle extreme temperatures with warnings instead of clamping
        const minTemp = 18; // 65°F
        const maxTemp = 29; // 85°F
        
        if (tempC < minTemp) {
            console.warn(`Temperature ${tempC}°C is below recommended minimum of ${minTemp}°C. Using ${minTemp}°C data.`);
            tempC = minTemp;
        } else if (tempC > maxTemp) {
            console.warn(`Temperature ${tempC}°C is above recommended maximum of ${maxTemp}°C. Using ${maxTemp}°C data.`);
            tempC = maxTemp;
        }
        
        console.log("Using temperature (C):", tempC);
        
        // Find the closest entries in the chart
        let lowerEntry = null;
        let upperEntry = null;
        
        for (let i = 0; i < aliquotChart.length; i++) {
            if (aliquotChart[i].tempC > tempC) {
                upperEntry = aliquotChart[i];
                lowerEntry = i > 0 ? aliquotChart[i-1] : aliquotChart[i];
                console.log("Found bounds - Lower:", lowerEntry.tempC, "Upper:", upperEntry.tempC);
                break;
            } else if (Math.abs(aliquotChart[i].tempC - tempC) < 0.1) {
                console.log("Found exact match at index", i);
                return aliquotChart[i]; // Exact match or very close
            }
        }
        
        // If we're at the upper end of the chart
        if (!upperEntry) {
            console.log("At upper end of chart, using maximum values");
            return aliquotChart[aliquotChart.length - 1];
        }
        
        // Interpolate values
        const range = upperEntry.tempC - lowerEntry.tempC;
        const ratio = range !== 0 ? (tempC - lowerEntry.tempC) / range : 0;
        console.log("Interpolation ratio:", ratio);
        
        const result = {
            tempC: tempC,
            tempF: Math.round(lowerEntry.tempF + ratio * (upperEntry.tempF - lowerEntry.tempF)),
            targetRise: Math.round(lowerEntry.targetRise + ratio * (upperEntry.targetRise - lowerEntry.targetRise)),
            timeMin: parseFloat((lowerEntry.timeMin + ratio * (upperEntry.timeMin - lowerEntry.timeMin)).toFixed(1)),
            timeMax: parseFloat((lowerEntry.timeMax + ratio * (upperEntry.timeMax - lowerEntry.timeMax)).toFixed(1)),
            sampleSize: Math.round(lowerEntry.sampleSize + ratio * (upperEntry.sampleSize - lowerEntry.sampleSize))
        };
        
        console.log("Interpolated result:", result);
        return result;
    }

    // Temperature conversion functions
    function convertFToC(fahrenheit) {
        return (fahrenheit - 32) * 5/9;
    }
    
    function convertCToF(celsius) {
        return (celsius * 9/5) + 32;
    }
    
    // Calculate water temperature
    function calculateWaterTemp(roomTemp, flourTemp, targetDoughTemp) {
        // Using the formula: Desired Dough Temp × 3 - (Room Temp + Flour Temp) = Water Temp
        return (targetDoughTemp * 3) - (roomTemp + flourTemp);
    }

    // Generate timeline checkpoints for aliquot method
    function generateTimeline(aliquotData, adjustmentFactor) {
        try {
            console.log("Generating timeline with:", { aliquotData, adjustmentFactor });
            const timelineHTML = [];
            const targetRise = aliquotData.targetRise;
            
            // Adjust times based on recipe factors
            const minTimeAdjusted = aliquotData.timeMin * adjustmentFactor;
            const maxTimeAdjusted = aliquotData.timeMax * adjustmentFactor;
            
            // Starting point
            timelineHTML.push(`
                <div class="timeline-item">
                    <div class="timeline-time">0:00</div>
                    <div class="timeline-label">Start of bulk fermentation</div>
                </div>
            `);
            
            // First check - about 25% through bulk
            const firstCheckHours = minTimeAdjusted * 0.25;
            timelineHTML.push(`
                <div class="timeline-item">
                    <div class="timeline-time">${formatHours(firstCheckHours)}</div>
                    <div class="timeline-label">First stretch & fold (${Math.round(targetRise * 0.25)}% rise)</div>
                </div>
            `);
            
            // Second check - halfway
            const secondCheckHours = minTimeAdjusted * 0.5;
            timelineHTML.push(`
                <div class="timeline-item">
                    <div class="timeline-time">${formatHours(secondCheckHours)}</div>
                    <div class="timeline-label">Second stretch & fold (${Math.round(targetRise * 0.5)}% rise)</div>
                </div>
            `);
            
            // Third check - about 75% through bulk
            const thirdCheckHours = minTimeAdjusted * 0.75;
            timelineHTML.push(`
                <div class="timeline-item">
                    <div class="timeline-time">${formatHours(thirdCheckHours)}</div>
                    <div class="timeline-label">Check aliquot jar (${Math.round(targetRise * 0.75)}% rise)</div>
                </div>
            `);
            
            // Expected completion time range
            timelineHTML.push(`
                <div class="timeline-item">
                    <div class="timeline-time">${formatHours(minTimeAdjusted)} - ${formatHours(maxTimeAdjusted)}</div>
                    <div class="timeline-label">Bulk fermentation complete (${targetRise}% rise)</div>
                </div>
            `);
            
            return timelineHTML.join('');
        } catch (error) {
            console.error("Error generating timeline:", error);
            return '<div class="timeline-item">Could not generate timeline</div>';
        }
    }
    
    // Format hours as h:mm
    function formatHours(hours) {
        const h = Math.floor(hours);
        const m = Math.round((hours - h) * 60);
        return `${h}:${m.toString().padStart(2, '0')}`;
    }

    // Set temperature input ranges and defaults (Fahrenheit only)
    function setTemperatureDefaults() {
        try {
            console.log("Setting temperature defaults (Fahrenheit)");
            
            // Set ranges for Fahrenheit inputs
            if (doughTempInput) {
                doughTempInput.min = 65;
                doughTempInput.max = 85;
                if (!doughTempInput.value || isNaN(parseFloat(doughTempInput.value))) {
                    doughTempInput.value = "72"; // Default Fahrenheit value
                }
            }
            
            if (roomTempInput) {
                roomTempInput.min = 50;
                roomTempInput.max = 95;
                if (!roomTempInput.value || isNaN(parseFloat(roomTempInput.value))) {
                    roomTempInput.value = "72"; // Default room temp in F
                }
            }
            
            if (flourTempInput) {
                flourTempInput.min = 50;
                flourTempInput.max = 86;
                if (!flourTempInput.value || isNaN(parseFloat(flourTempInput.value))) {
                    flourTempInput.value = "72"; // Default flour temp in F
                }
            }
            
            if (targetDoughTempInput) {
                targetDoughTempInput.min = 65;
                targetDoughTempInput.max = 82;
                if (!targetDoughTempInput.value || isNaN(parseFloat(targetDoughTempInput.value))) {
                    targetDoughTempInput.value = "75"; // Default target dough temp in F
                }
            }
            
            console.log("Temperature defaults set:", {
                doughTemp: doughTempInput ? doughTempInput.value : 'N/A',
                roomTemp: roomTempInput ? roomTempInput.value : 'N/A',
                flourTemp: flourTempInput ? flourTempInput.value : 'N/A',
                targetDoughTemp: targetDoughTempInput ? targetDoughTempInput.value : 'N/A'
            });
        } catch (error) {
            console.error("Error setting temperature defaults:", error);
        }
    }
    
    // Calculate and display water temperature (Fahrenheit only)
    function calculateWaterTemperature() {
        try {
            // Check if all required elements exist
            if (!roomTempInput || !flourTempInput || !targetDoughTempInput || !waterTempElement) {
                console.error("Missing required elements for water temperature calculation");
                return;
            }
            
            let roomTemp = parseFloat(roomTempInput.value);
            let flourTemp = parseFloat(flourTempInput.value);
            let targetDoughTemp = parseFloat(targetDoughTempInput.value);
            
            // Validate inputs
            if (isNaN(roomTemp) || isNaN(flourTemp) || isNaN(targetDoughTemp)) {
                waterTempElement.textContent = '--';
                return;
            }
            
            console.log("Water temp calculation inputs (Fahrenheit):", {
                roomTemp,
                flourTemp,
                targetDoughTemp
            });
            
            // Convert to Celsius for calculation
            const roomTempC = convertFToC(roomTemp);
            const flourTempC = convertFToC(flourTemp);
            const targetDoughTempC = convertFToC(targetDoughTemp);
            
            console.log("Converted to Celsius for calculation:", {
                roomTempC,
                flourTempC,
                targetDoughTempC
            });
            
            // Calculate water temperature using the formula
            let waterTempC = calculateWaterTemp(roomTempC, flourTempC, targetDoughTempC);
            console.log("Calculated water temperature (C):", waterTempC);
            
            // Check if water temp is unreasonable and show a warning
            const waterResultElement = document.querySelector('.water-temp-result');
            if (waterResultElement) {
                if (waterTempC < 0 || waterTempC > 100) {
                    waterResultElement.classList.add('warning');
                } else {
                    waterResultElement.classList.remove('warning');
                }
            }
            
            // Convert back to Fahrenheit for display
            const waterTempF = convertCToF(waterTempC);
            console.log("Converted water temperature to Fahrenheit:", waterTempF);
            
            // Update the display
            if (waterTempElement) {
                waterTempElement.textContent = waterTempF.toFixed(1);
            }
        } catch (error) {
            console.error("Error calculating water temperature:", error);
            if (waterTempElement) {
                waterTempElement.textContent = '--';
            }
        }
    }
    
    // Calculate and display results - simplified to use only essential parameters (Fahrenheit only)
    function calculateResults() {
        try {
            console.log("Calculate button clicked - calculating results");
            
            // Check if required DOM elements exist
            if (!doughTempInput || !flourTypeSelect || !hydrationInput || !starterPercentInput ||
                !bulkTimeElement || !progressFill || !progressPercent || !sampleSizeElement || !timelineContainer) {
                console.error("Required DOM elements missing for calculation");
                return;
            }
            
            // Get values from input fields
            let doughTempF = parseFloat(doughTempInput.value);
            const flourType = flourTypeSelect.value || 'bread'; // Default to bread flour if not specified
            const hydration = parseFloat(hydrationInput.value);
            const starterPercent = parseFloat(starterPercentInput.value);
            
            console.log("Essential input values:", {
                doughTempF,
                flourType,
                hydration,
                starterPercent
            });
            
            // Validate essential inputs
            if (isNaN(doughTempF) || isNaN(hydration) || isNaN(starterPercent)) {
                console.error("Invalid input values");
                alert('Please enter valid numbers for temperature, hydration, and starter percentage');
                return;
            }
            
            // Ensure values are within reasonable ranges
            if (hydration < 50 || hydration > 100) {
                console.warn("Hydration out of typical range:", hydration);
            }
            
            if (starterPercent < 5 || starterPercent > 50) {
                console.warn("Starter percentage out of typical range:", starterPercent);
            }
            
            // Always convert temperature to Celsius for calculations
            const doughTempC = convertFToC(doughTempF);
            console.log("Converted dough temp to Celsius:", doughTempC);
            
            // Get aliquot data based on temperature
            const aliquotData = getAliquotData(doughTempC);
            console.log("Aliquot data found:", aliquotData);
            
            if (!aliquotData) {
                console.error("Failed to get aliquot data");
                alert("Could not calculate fermentation data for the given temperature");
                return;
            }
            
            // Get adjustment factor based on recipe - using only essential parameters
            const adjustmentFactor = getRecipeAdjustmentFactor(
                hydration, starterPercent, flourType
            );
            console.log("Adjustment factor calculated:", adjustmentFactor);
            
            // Adjust fermentation times
            const minTimeAdjusted = aliquotData.timeMin * adjustmentFactor;
            const maxTimeAdjusted = aliquotData.timeMax * adjustmentFactor;
            console.log("Adjusted times:", { minTimeAdjusted, maxTimeAdjusted });
            
            // Update the UI
            bulkTimeElement.textContent = `${minTimeAdjusted.toFixed(1)} to ${maxTimeAdjusted.toFixed(1)} hours`;
            progressFill.style.width = `${aliquotData.targetRise}%`;
            progressPercent.textContent = `${aliquotData.targetRise}%`;
            sampleSizeElement.textContent = `${aliquotData.sampleSize}g`;
            
            // Calculate water temperature
            calculateWaterTemperature();
            
            // Generate and display timeline
            const timelineHTML = generateTimeline(aliquotData, adjustmentFactor);
            if (timelineHTML) {
                timelineContainer.innerHTML = timelineHTML;
            } else {
                console.error("Failed to generate timeline");
                timelineContainer.innerHTML = '<div class="timeline-item">Could not generate timeline</div>';
            }
            
            console.log("Calculation complete, UI updated");
        } catch (error) {
            console.error("Error in calculateResults:", error);
            alert("An error occurred during calculation. Please check your inputs and try again.");
        }
    }

    // Handle toggle for advanced options
    const toggleAdvancedBtn = document.getElementById('toggle-advanced');
    const advancedOptions = document.getElementById('advanced-options');
    
    toggleAdvancedBtn.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent any default button behavior
        console.log("Advanced options toggle clicked");
        advancedOptions.classList.toggle('hidden');
        toggleAdvancedBtn.textContent = advancedOptions.classList.contains('hidden') 
            ? 'Show Advanced Options ▼' 
            : 'Hide Advanced Options ▲';
        console.log("Advanced options hidden:", advancedOptions.classList.contains('hidden'));
    });
    
    // Removing duplicate code
    
    // Setup toggles for collapsible sections
    const toggleWaterCalcBtn = document.getElementById('toggle-water-calc');
    const waterCalcSection = document.getElementById('water-calc-section');
    
    toggleWaterCalcBtn.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent any default button behavior
        console.log("Water calc toggle clicked");
        waterCalcSection.classList.toggle('hidden');
        toggleWaterCalcBtn.textContent = waterCalcSection.classList.contains('hidden') 
            ? 'Show Water Temperature Calculator ▼' 
            : 'Hide Water Temperature Calculator ▲';
        console.log("Water calc hidden:", waterCalcSection.classList.contains('hidden'));
        
        // If showing the calculator, calculate the water temp
        if (!waterCalcSection.classList.contains('hidden')) {
            calculateWaterTemperature();
        }
    });
    
    // Simpler, less restrictive input validation
    document.querySelectorAll('input[type="number"]').forEach(input => {
        // Only validate on blur, not during input
        input.addEventListener('blur', function() {
            // Set default value only if empty and required
            if (this.value === '' && this.hasAttribute('required')) {
                this.value = this.getAttribute('min') || '0';
            }
            
            // Only enforce min/max after user has finished typing
            const numValue = parseFloat(this.value);
            const min = parseFloat(this.min);
            const max = parseFloat(this.max);
            
            if (!isNaN(numValue) && !isNaN(min) && !isNaN(max)) {
                // Only show warning, don't force value change
                if (numValue < min || numValue > max) {
                    console.warn(`Value ${numValue} is outside the recommended range (${min}-${max})`);
                }
            }
        });
    });
    
    // Event listeners - improved with error handling
    calculateBtn.addEventListener('click', function(e) {
        console.log("Calculate button clicked");
        e.preventDefault(); // Prevent any default behavior
        
        // Validate all required fields before calculation
        let isValid = true;
        document.querySelectorAll('input[required]').forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('invalid');
                isValid = false;
            } else {
                input.classList.remove('invalid');
            }
        });
        
        if (isValid) {
            calculateResults();
        } else {
            alert('Please fill in all required fields');
        }
    });
    
    // Add direct execution on Enter key press
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                console.log("Enter key pressed in input field");
                e.preventDefault();
                calculateResults();
            }
        });
    });
    
    roomTempInput.addEventListener('input', calculateWaterTemperature);
    flourTempInput.addEventListener('input', calculateWaterTemperature);
    targetDoughTempInput.addEventListener('input', calculateWaterTemperature);
    
    // Initialize with default values for the advanced options
    const wholeGrainInput = document.getElementById('whole-grain');
    const saltPercentInput = document.getElementById('salt-percent');
    
    // Set default values
    wholeGrainInput.value = 10;
    saltPercentInput.value = 2;
    
    // Make sure water calculator and advanced options are collapsed on load
    waterCalcSection.classList.add('hidden');
    advancedOptions.classList.add('hidden');
    
    // Set defaults and run initial calculation
    console.log("Performing initial calculation on page load");
    try {
        // Set temperature defaults (Fahrenheit only now)
        setTemperatureDefaults();
        
        // Set initial values if needed
        if (hydrationInput && hydrationInput.value === "") {
            hydrationInput.value = "75";
        }
        
        if (starterPercentInput && starterPercentInput.value === "") {
            starterPercentInput.value = "20";
        }
        
        // Run initial calculation with a delay to ensure DOM is ready
        setTimeout(function() {
            try {
                calculateResults();
                console.log("Initial calculation completed");
            } catch (error) {
                console.error("Error during initial calculation:", error);
            }
        }, 500);
    } catch (error) {
        console.error("Error setting up initial calculation:", error);
    }
});