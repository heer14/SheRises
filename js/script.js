// Track current fill percentage for animation
let currentGirlPercent = 100;
let currentBoyPercent = 100;

// In the script section, change the colors array
const colors = [
    'linear-gradient(180deg, #ff9ed8, #ff69b4)', // Pink gradient
];

function updateChartGirl(percent = 100) {
    const container = document.getElementById('chartContainer');
    container.innerHTML = '';

    const percentage = parseInt(percent)|| 0;
    const clampedPercentage = Math.max(0, Math.min(100, percentage));
    
    const barItem = document.createElement('div');
    barItem.className = 'bar-item';

    const silhouette = document.createElement('div');
    silhouette.className = 'girl-silhouette';

    // Create shadow effect
    const shadow = document.createElement('div');
    shadow.className = 'girl-fill';

    shadow.innerHTML = createGirlSVG();
    shadow.querySelector('svg path').style.fill = 'rgb(164, 183, 237)';
    shadow.querySelector('svg path').style.stroke = 'none';

    // Create outline (background silhouette)
    const outline = document.createElement('div');
    outline.className = 'girl-outline-container';
    outline.innerHTML = createGirlSVG();
    outline.querySelector('svg path').style.fill = 'transparent';
    
    // Create fill (the colored part)
    const fill = document.createElement('div');
    fill.className = 'girl-fill';
    fill.innerHTML = createGirlSVG();
    fill.querySelector('svg path').style.fill = 'rgb(40, 65, 124)';
    fill.querySelector('svg path').style.stroke = 'none';

    // Set the CSS variable for animation start and end points
    fill.style.setProperty('--start-inset', `${100-currentGirlPercent}%`);
    fill.style.setProperty('--target-inset', `${100-clampedPercentage}%`);

    // Remove and re-add animation class for smooth retrigger
    fill.classList.remove('animate-fill');
    void fill.offsetWidth; // Force reflow
    setTimeout(() => {
        fill.classList.add('animate-fill');
    }, 20);

    silhouette.appendChild(outline);
    silhouette.appendChild(shadow);
    silhouette.appendChild(fill);

    const percentLabel = document.createElement('div');
    percentLabel.className = 'percent-label';
    percentLabel.textContent = `${clampedPercentage}%`;
    percentLabel.style.textAlign = 'center';
    percentLabel.style.fontWeight = 'bold';
    percentLabel.style.marginTop = '10px';
    percentLabel.style.color = 'rgb(40, 65, 124)';
    
    const categoryLabel = document.createElement('div');
    categoryLabel.className = 'category-label';

    barItem.appendChild(silhouette);
    barItem.appendChild(percentLabel); // Add the percent label
    barItem.appendChild(categoryLabel);
    container.appendChild(barItem);

    // Update the current percent for next animation
    currentGirlPercent = clampedPercentage;
}

function updateChartBoy(percent = 100) {
    const container = document.getElementById('chartContainerBoy');
    container.innerHTML = '';

    const percentage = parseInt(percent)|| 0;
    const clampedPercentage = Math.max(0, Math.min(100, percentage));
    
    const barItem = document.createElement('div');
    barItem.className = 'bar-item-boy';

    const silhouette = document.createElement('div');
    silhouette.className = 'boy-silhouette';

    // Create outline (background silhouette)
    const outline = document.createElement('div');
    outline.className = 'boy-outline-container';
    outline.innerHTML = createBoySVG();
    outline.querySelector('svg path').style.fill = 'transparent';

    // Create shadow effect
    const shadow = document.createElement('div');
    shadow.className = 'boy-fill';
    shadow.innerHTML = createBoySVG();
    shadow.querySelector('svg path').style.fill = 'rgb(224, 165, 239)';
    shadow.querySelector('svg path').style.stroke = 'none';
    
    // Create fill (the colored part)
    const fill = document.createElement('div');
    fill.className = 'boy-fill';
    fill.innerHTML = createBoySVG();
    fill.querySelector('svg path').style.fill = 'palevioletred';
    fill.querySelector('svg path').style.stroke = 'none';

    // Set the CSS variable for animation start and end points
    fill.style.setProperty('--start-inset', `${100 - currentBoyPercent}%`);
    fill.style.setProperty('--target-inset', `${100 - clampedPercentage}%`);

    // Remove and re-add animation class for smooth retrigger
    fill.classList.remove('animate-fill-boy');
    void fill.offsetWidth; // Force reflow
    setTimeout(() => {
        fill.classList.add('animate-fill-boy');
    }, 20);

    silhouette.appendChild(outline);
    silhouette.appendChild(shadow);
    silhouette.appendChild(fill);

    const percentLabel = document.createElement('div');
    percentLabel.className = 'percent-label';
    percentLabel.textContent = `${clampedPercentage}%`;
    percentLabel.style.textAlign = 'center';
    percentLabel.style.fontWeight = 'bold';
    percentLabel.style.marginTop = '10px';
    percentLabel.style.color = 'palevioletred';
    
    const categoryLabel = document.createElement('div');
    categoryLabel.className = 'category-label-boy';

    barItem.appendChild(silhouette);
    barItem.appendChild(percentLabel); // Add the percent label
    barItem.appendChild(categoryLabel);
    container.appendChild(barItem);

    // Update the current percent for next animation
    currentBoyPercent = clampedPercentage;
}
document.addEventListener('DOMContentLoaded', function() {
  const introText = [
    "Imagine two children born on the same day in the same hospital. Both enter the world with infinite potential. Yet, as they grow, their paths diverge in subtle but significant ways—not because of their abilities, but because of their gender. This is the story of Maya and Noah, representing millions of girls and boys around the world whose life trajectories are shaped by systemic gender disparities.",
    "This visualization traces their parallel journeys from birth to career, showing how educational opportunities translate into economic outcomes. Every step reveals how small gaps in childhood widen into significant divides in adulthood."
  ];
  
  const typingContainer = document.getElementById('typing-intro');
  const startJourneyBtn = document.getElementById('start-journey-btn');
  const introContainer = document.getElementById('intro-container');
  
  typingContainer.innerHTML = ''; // Clear any existing content
  
  let paragraphIndex = 0;
  let charIndex = 0;
  let currentParagraph = document.createElement('p');
  typingContainer.appendChild(currentParagraph);
  currentParagraph.classList.add('typing-text');
  
  const typingSpeed = 30; // milliseconds per character
  const paragraphPause = 700; // pause between paragraphs
  
  function typeText() {
    if (paragraphIndex < introText.length) {
      if (charIndex < introText[paragraphIndex].length) {
        currentParagraph.innerHTML += introText[paragraphIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeText, typingSpeed);
      } else {
        // Paragraph complete, start new paragraph after pause
        paragraphIndex++;
        charIndex = 0;
        
        if (paragraphIndex < introText.length) {
          setTimeout(() => {
            currentParagraph = document.createElement('p');
            currentParagraph.classList.add('typing-text');
            typingContainer.appendChild(currentParagraph);
            typeText();
          }, paragraphPause);
        } else {
          // All paragraphs complete, show the start journey button
          setTimeout(() => {
            startJourneyBtn.classList.add('visible');
          }, 500);
        }
      }
    }
  }
  
  // Add cursor element
  const cursor = document.createElement('span');
  cursor.className = 'typing-cursor';
  cursor.innerHTML = '|';
  typingContainer.appendChild(cursor);
  
  // Start typing animation after a short delay
  setTimeout(typeText, 500);
  
  // Add click handler for start journey button
  startJourneyBtn.addEventListener('click', function() {
    // Fade out the intro container
    introContainer.style.opacity = '0';
    introContainer.style.visibility = 'hidden';
    
    // Show the content and fixed headers
    document.querySelectorAll('.content-hidden').forEach(element => {
      element.classList.remove('content-hidden');
    });
    
    // Remove intro container after animation completes
    setTimeout(() => {
      const allStages = document.querySelectorAll('.stage');
      allStages.forEach((stage, index) => {
        if (index === 0) {
          stage.classList.add('active-stage');
        } else {
          stage.classList.add('inactive-stage');
        }
      });
      
      // Initial chart update
      if (typeof updateChartGirl === 'function') {
        updateChartGirl(100);
      }
      if (typeof updateChartBoy === 'function') {
        updateChartBoy(100);
      }
      
      // Scroll to beginning of journey
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 800);
  });
});
// Ensure we call this function when the document is ready
document.addEventListener('DOMContentLoaded', function() {
  // First, activate only the first stage and blur others
  const allStages = document.querySelectorAll('.stage');
  allStages.forEach((stage, index) => {
    if (index === 0) {
      stage.classList.add('active-stage');
    }
  });
  
  // Initial chart update
  updateChartGirl(100);
  updateChartBoy(100);
});

// Function to initialize navigation
function initializeNavigation() {
  const navCircles = document.querySelectorAll('.nav-circle');
  const femaleStages = document.querySelector('.journey-column.female').querySelectorAll('.stage');
  const maleStages = document.querySelector('.journey-column.male').querySelectorAll('.stage');
  let currentStageIndex = 0;
  let isProgrammaticNav = false; // Prevent scroll loop

  // Function to update active stage
  function navigateToStage(stageIndex, scroll = true) {
    if (stageIndex < 0 || stageIndex >= navCircles.length) return;
    currentStageIndex = stageIndex;
    // Update nav circles with smooth highlight
    navCircles.forEach((circle, index) => {
      if (index === stageIndex) {
        circle.classList.add('active', 'nav-animate');
      } else {
        circle.classList.remove('active', 'nav-animate');
      }
    });
    // Update female stages
    femaleStages.forEach((stage, index) => {
      if (index === stageIndex) {
        stage.classList.add('active-stage', 'stage-animate');
        stage.classList.remove('inactive-stage');
      } else {
        stage.classList.remove('active-stage', 'stage-animate');
        stage.classList.add('inactive-stage');
      }
    });
    // Update male stages
    maleStages.forEach((stage, index) => {
      if (index === stageIndex) {
        stage.classList.add('active-stage', 'stage-animate');
        stage.classList.remove('inactive-stage');
      } else {
        stage.classList.remove('active-stage', 'stage-animate');
        stage.classList.add('inactive-stage');
      }
    });
    // Update charts based on financial independence data
    const femaleFinancialLabel = femaleStages[stageIndex].querySelector('.financial-label');
    if (femaleFinancialLabel) {
      const percentText = femaleFinancialLabel.textContent.match(/\d+/);
      if (percentText) {
        updateChartGirl(parseInt(percentText[0]));
      }
    }
    const maleFinancialLabel = maleStages[stageIndex].querySelector('.financial-label');
    if (maleFinancialLabel) {
      const percentText = maleFinancialLabel.textContent.match(/\d+/);
      if (percentText) {
        updateChartBoy(parseInt(percentText[0]));
      }
    }
    // Removed scrollIntoView for active stage
  }
  // Expose navigateToStage globally for scroll logic
  window.navigateToStage = navigateToStage;

  // Add click handlers to nav circles
  navCircles.forEach((circle) => {
    circle.addEventListener('click', function() {
      const stageIndex = parseInt(this.getAttribute('data-stage'));
      navigateToStage(stageIndex);
    });
    // Make nav circles keyboard accessible
    circle.setAttribute('tabindex', '0');
    circle.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        const stageIndex = parseInt(this.getAttribute('data-stage'));
        navigateToStage(stageIndex);
      }
    });
  });
  // Keyboard navigation for left/right arrows
  document.addEventListener('keydown', function(e) {
    if (document.activeElement.classList.contains('nav-circle')) {
      if (e.key === 'ArrowRight') {
        navigateToStage(Math.min(currentStageIndex + 1, navCircles.length - 1));
        navCircles[Math.min(currentStageIndex + 1, navCircles.length - 1)].focus();
      } else if (e.key === 'ArrowLeft') {
        navigateToStage(Math.max(currentStageIndex - 1, 0));
        navCircles[Math.max(currentStageIndex - 1, 0)].focus();
      }
    }
  });
  // Initialize first stage
  navigateToStage(0);
}
// Only call navigation initialization once after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    initializeNavigation();
    // ...existing code...
  }, 1000);
});

// Function to match the height of the chart spacer with chart containers
function matchChartSpacerHeight() {
  const chartContainer = document.getElementById('chartContainer');
  const chartContainerBoy = document.getElementById('chartContainerBoy');
  const chartSpacer = document.querySelector('.chart-spacer');
  
  if (chartContainer && chartContainerBoy && chartSpacer) {
    const femaleHeight = chartContainer.offsetHeight;
    const maleHeight = chartContainerBoy.offsetHeight;
    const maxHeight = Math.max(femaleHeight, maleHeight);
    
    chartSpacer.style.height = `${maxHeight}px`;
  }
}

// Function to dynamically match heights between navigation and stages
function matchStageHeights() {
  const femaleStages = document.querySelector('.journey-column.female').querySelectorAll('.stage');
  const maleStages = document.querySelector('.journey-column.male').querySelectorAll('.stage');
  const navContainers = document.querySelectorAll('.nav-stage-container');
  
  // Only proceed if all elements are present
  if (!femaleStages.length || !maleStages.length || !navContainers.length) return;
  
  // Process each stage pair
  for (let i = 0; i < femaleStages.length; i++) {
      // Get heights of female and male stages
      const femaleHeight = femaleStages[i].offsetHeight;
      const maleHeight = maleStages[i].offsetHeight;
      
      // Use the maximum height for the navigation container
      const maxHeight = Math.max(femaleHeight, maleHeight);
      
      // Set the height of the navigation container
      navContainers[i].style.height = `${maxHeight}px`;
      femaleStages[i].style.height = `${maxHeight}px`;
      maleStages[i].style.height = `${maxHeight}px`;
  }
}

// Update the DOM content loaded event handler
document.addEventListener('DOMContentLoaded', function() {
  // Ensure content is visible first
  setTimeout(() => {
    document.querySelectorAll('.content-hidden').forEach(element => {
      element.classList.remove('content-hidden');
    });
    
    // Wait a bit longer for content to render
    setTimeout(() => {
      initializeNavigation();
      
      // Retry height matching with multiple attempts
      retryMatchStageHeights();
      
      // Setup resize handler
      window.addEventListener('resize', () => {
        matchChartSpacerHeight();
        matchStageHeights();
      });
    }, 500);
  }, 800);
});

// Add this to your code for more reliable height detection
function setupResizeObservers() {
  // Check if ResizeObserver is available
  if (typeof ResizeObserver !== 'undefined') {
    const resizeObserver = new ResizeObserver((entries) => {
      // When any observed element changes size
      matchChartSpacerHeight();
      matchStageHeights();
    });
    
    // Observe the stage containers
    document.querySelectorAll('.journey-column .stage').forEach(stage => {
      resizeObserver.observe(stage);
    });
    
    // Also observe chart containers
    const chartContainer = document.getElementById('chartContainer');
    const chartContainerBoy = document.getElementById('chartContainerBoy');
    if (chartContainer) resizeObserver.observe(chartContainer);
    if (chartContainerBoy) resizeObserver.observe(chartContainerBoy);
  }
}

// Call this after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(setupResizeObservers, 1000);
});

// Function to align navigation circles with the centers of female stages
function alignNavWithStages() {
  const femaleStages = document.querySelectorAll('.journey-column.female .stage');
  const navCircles = document.querySelectorAll('.nav-circle');
  const navStageContainers = document.querySelectorAll('.nav-stage-container');
  const navContainer = document.querySelector('.nav-container');
  
  // Only proceed if we have the necessary elements
  if (!femaleStages.length || !navCircles.length || !navContainer) return;
  
  // Get the top offset of the female journey column
  const femaleColumn = document.querySelector('.journey-column.female');
  const maleColumn = document.querySelector('.journey-column.male');
  const femaleTop = femaleColumn.getBoundingClientRect().top;
  const headerHeight = document.querySelector('.column-header')?.offsetHeight || 0;
  const chartHeight = document.getElementById('chartContainer')?.offsetHeight || 0;
  
  // Set top padding to match chart spacing
  navContainer.style.paddingTop = `${chartHeight + headerHeight}px`;
  
  // Get the total height of the female/male columns for matching
  const femaleHeight = femaleColumn.offsetHeight;
  const maleHeight = maleColumn.offsetHeight;
  const columnHeight = Math.max(femaleHeight, maleHeight);
  
  // Set the minimum height of the nav container to match the columns
  navContainer.style.minHeight = `${columnHeight - (chartHeight + headerHeight)}px`;
  
  // Position each nav circle to match center of corresponding stage
  femaleStages.forEach((stage, index) => {
    if (index < navStageContainers.length) {
      // Get vertical center position of the female stage
      const stageRect = stage.getBoundingClientRect();
      const stageCenter = stageRect.top + stageRect.height / 2 - femaleTop;
      
      // Get the nav container and its circle
      const navContainer = navStageContainers[index];
      const navCircle = navContainer.querySelector('.nav-circle');
      
      // Position the nav container so its circle aligns with stage center
      if (navCircle) {
        const navCircleRect = navCircle.getBoundingClientRect();
        const navCircleHeight = navCircleRect.height;
        
        // Calculate the top position for the nav container
        navContainer.style.position = 'absolute';
        navContainer.style.top = `${stageCenter - navCircleHeight/2}px`;
        
        // Remove any height restriction
        navContainer.style.height = 'auto';
      }
    }
  });
}

// Call on load and when window resizes
document.addEventListener('DOMContentLoaded', function() {
  // Wait for content to render fully
  setTimeout(alignNavWithStages, 500);
  window.addEventListener('resize', alignNavWithStages);
  
  // Use ResizeObserver to detect content changes
  if (typeof ResizeObserver !== 'undefined') {
    const resizeObserver = new ResizeObserver(() => {
      alignNavWithStages();
    });
    
    // Observe elements that might change size
    document.querySelectorAll('.stage, .chart-container').forEach(el => {
      resizeObserver.observe(el);
    });
  }
});

// Add end journey button functionality
// Make the end journey button always visible

document.addEventListener('DOMContentLoaded', function() {
  const endJourneyBtn = document.getElementById('end-journey-btn');
  if (endJourneyBtn) {
    endJourneyBtn.style.display = 'block'; // Always visible
    endJourneyBtn.classList.add('visible'); // In case you use a visible class for animation
    endJourneyBtn.addEventListener('click', function() {
      // Hide all journey columns
      const journeyColumns = document.querySelectorAll('.journey-column');
      journeyColumns.forEach(column => {
        column.style.display = 'none';
      });
      // Show only the conclusion
      const journeyConclusion = document.querySelector('.journey-conclusion');
      if (journeyConclusion) {
        journeyConclusion.style.display = 'block';
        journeyConclusion.scrollIntoView({ behavior: 'smooth' });
      }
      // Update any headers if needed
      const fixedHeaders = document.querySelector('.fixed-headers');
      if (fixedHeaders) {
        fixedHeaders.querySelector('h2').textContent = 'Journey Conclusion';
      }
      // Remove the button after clicking
      this.remove();
    });
  }
});

// Updated skipToConclusion function with sequential typewriter effect
function skipToConclusion() {
  // Hide all journey columns
  const journeyColumns = document.querySelectorAll('.journey-column');
  journeyColumns.forEach(column => {
    column.style.display = 'none';
  });
  
  // Remove the end journey button from the page
  const endJourneyBtn = document.getElementById('end-journey-btn');
  if (endJourneyBtn) {
    endJourneyBtn.remove();
  }
  
  // Also remove the end-journey-footer if it exists
  const endJourneyFooter = document.querySelector('.end-journey-footer');
  if (endJourneyFooter) {
    endJourneyFooter.remove();
  }
  
  // Show the conclusion container
  const journeyConclusion = document.querySelector('.journey-conclusion');
  if (journeyConclusion) {
    journeyConclusion.style.display = 'block';
    journeyConclusion.scrollIntoView({ behavior: 'smooth' });
    
    // Hide all paragraphs initially
    const paragraphs = journeyConclusion.querySelectorAll('p');
    const callToAction = journeyConclusion.querySelector('.call-to-action');
    const actionSteps = journeyConclusion.querySelector('.action-steps');
    const microActionsNote = journeyConclusion.querySelector('.micro-actions-note');
    const closingThought = journeyConclusion.querySelector('.closing-thought');
    
    paragraphs.forEach(p => { p.style.display = 'none'; });
    if (callToAction) callToAction.style.display = 'none';
    if (actionSteps) actionSteps.style.display = 'none';
    if (microActionsNote) microActionsNote.style.display = 'none';
    if (closingThought) closingThought.style.display = 'none';
    
    // Show only the title immediately
    const title = journeyConclusion.querySelector('h3');
    if (title) {
      title.style.display = 'block';
      
      // Remove any existing keyboard hints
      const existingHint = journeyConclusion.querySelector('.keyboard-hint');
      if (existingHint) existingHint.remove();
      
      // Create array of elements to type
      const elementsToType = [...paragraphs];
      if (callToAction) elementsToType.push(callToAction);
      
      // Start sequential typewriter effect
      sequentialTypewriter(elementsToType, 0, function() {
        // After all paragraphs are typed, show action button
        const actionButton = document.createElement('button');
        actionButton.textContent = 'What we can do ?';
        // Apply the same class as the initial journey button for consistent styling
        actionButton.className = 'show-actions-btn start-journey-btn';
        journeyConclusion.appendChild(actionButton);
        
        actionButton.addEventListener('click', function() {
          if (actionSteps) {
            actionSteps.style.display = 'block';
            actionSteps.scrollIntoView({ behavior: 'smooth', block: 'center' });
            this.remove();
          }
        // After all paragraphs are typed, show action button
        const actionButton2 = document.createElement('button');
        actionButton2.textContent = 'Your Turn';
        actionButton2.className = 'show-actions-btn start-journey-btn';
        journeyConclusion.appendChild(actionButton2);

        actionButton2.addEventListener('click', function() {
          if (microActionsNote) {
            microActionsNote.style.display = 'block';
            microActionsNote.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          if (closingThought) {
            closingThought.style.display = 'block';
            closingThought.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          this.remove();
        });
        });
      });
    }
  }
  
  // Update any headers if needed
  const fixedHeaders = document.querySelector('.fixed-headers');
  if (fixedHeaders) {
    fixedHeaders.querySelector('h2').textContent = 'Journey Conclusion';
  }

}

// Add a global variable to track speed multiplier
let typewriterSpeedMultiplier = 1.0;

// Updated sequentialTypewriter function with speed control
function sequentialTypewriter(elements, currentIndex, finalCallback) {
  if (currentIndex >= elements.length) {
    if (finalCallback) finalCallback();
    // Remove the Enter key event listener when all typing is done
    document.removeEventListener('keydown', handleEnterKeyForTypewriter);
    return;
  }
  
  // Add an event listener for Enter key if this is the first element
  if (currentIndex === 0) {
    // Reset speed multiplier for new sequence
    typewriterSpeedMultiplier = 1.0;
    document.addEventListener('keydown', handleEnterKeyForTypewriter);
  }
  
  const element = elements[currentIndex];
  element.style.display = 'block';
  
  // Apply typewriter effect to current element
  const text = element.textContent;
  element.textContent = '';
  element.classList.add('typewriter-text');
  
  let i = 0;
  const baseSpeed = 20; // base typing speed in milliseconds
  
  function typeWriter() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      // Use the current speed multiplier to determine actual speed
      setTimeout(typeWriter, baseSpeed / typewriterSpeedMultiplier);
    } else {
      // Remove the typewriter class when done
      element.classList.remove('typewriter-text');
      
      // Short pause before starting the next element
      setTimeout(() => {
        sequentialTypewriter(elements, currentIndex + 1, finalCallback);
      }, 500);
    }
  }
  
  typeWriter();
}

// Function to handle Enter key for speeding up typewriter
function handleEnterKeyForTypewriter(event) {
  if (event.key === 'Enter') {
    // Increase speed by 10% each time Enter is pressed
    typewriterSpeedMultiplier *= 1.1;
    
    // Create a brief visual indicator that speed has increased
    const speedIndicator = document.createElement('div');
    speedIndicator.className = 'speed-indicator';
    speedIndicator.textContent = `Speed: ${typewriterSpeedMultiplier.toFixed(1)}x`;
    document.body.appendChild(speedIndicator);
    
    // Remove the indicator after a brief moment
    setTimeout(() => {
      speedIndicator.classList.add('fade-out');
      setTimeout(() => speedIndicator.remove(), 500);
    }, 800);
  }
}

// Simplified back to journey functionality with page reload
document.addEventListener('DOMContentLoaded', function() {
  const backToJourneyBtn = document.getElementById('back-to-journey-btn');
  
  if (backToJourneyBtn) {
    backToJourneyBtn.addEventListener('click', function() {
      // Simply reload the page
      location.reload();
    });
  }
});

// --- Smooth scroll-based stage activation ---
function setupScrollStageActivation() {
  const navCircles = document.querySelectorAll('.nav-circle');
  const femaleStages = document.querySelector('.journey-column.female').querySelectorAll('.stage');
  const maleStages = document.querySelector('.journey-column.male').querySelectorAll('.stage');
  let lastActiveIndex = 0;
  let isProgrammaticNav = false;

  function onScroll() {
    if (isProgrammaticNav) return;
    const viewportCenter = window.innerHeight / 2;
    let closestIndex = 0;
    let minDistance = Infinity;
    for (let i = 0; i < femaleStages.length; i++) {
      const rect = femaleStages[i].getBoundingClientRect();
      const stageCenter = rect.top + rect.height / 2;
      const distance = Math.abs(stageCenter - viewportCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }
    if (lastActiveIndex !== closestIndex) {
      if (typeof window.navigateToStage === 'function') {
        isProgrammaticNav = true;
        window.navigateToStage(closestIndex, false);
        setTimeout(() => { isProgrammaticNav = false; }, 100);
      }
      lastActiveIndex = closestIndex;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
}

// Call after DOM and navigation are ready
setTimeout(setupScrollStageActivation, 1500);