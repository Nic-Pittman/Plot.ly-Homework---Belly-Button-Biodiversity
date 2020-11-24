Nic Pittman

https://nic-pittman.github.io/Plot.ly-Homework---Belly-Button-Biodiversity/

# Plot.ly-Homework---Belly-Button-Biodiversity

Plot.ly Homework - Belly Button Biodiversity

In this assignment, you will build an interactive dashboard to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels.
The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

### Step 1: Plotly


 1. Use the D3 library to read in samples.json.


 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.


- Use sample_values as the values for the bar chart.


- Use otu_ids as the labels for the bar chart.


- Use otu_labels as the hovertext for the chart.

![bar](https://user-images.githubusercontent.com/69124282/100138397-f9a25880-2e5b-11eb-8c90-756db8a0ea22.jpg)


 3. Create a bubble chart that displays each sample.


- Use otu_ids for the x values.


- Use sample_values for the y values.


- Use sample_values for the marker size.


- Use otu_ids for the marker colors.


- Use otu_labels for the text values.

![bubble](https://user-images.githubusercontent.com/69124282/100138412-fd35df80-2e5b-11eb-9ff2-e3cb4c21cbd3.jpg)


 4. Display the sample metadata, i.e., an individual's demographic information.


 5. Display each key-value pair from the metadata JSON object somewhere on the page.

![panel](https://user-images.githubusercontent.com/69124282/100138415-feffa300-2e5b-11eb-807a-654a8d558801.jpg)


 6. Update all of the plots any time that a new sample is selected.
 
 https://nic-pittman.github.io/Plot.ly-Homework---Belly-Button-Biodiversity/


# Advanced Challenge Assignment (Optional)
The following task is advanced and therefore optional.


- Adapt the Gauge Chart from https://plot.ly/javascript/gauge-charts/ to plot the weekly washing frequency of the individual.


- You will need to modify the example gauge code to account for values ranging from 0 through 9.


- Update the chart whenever a new sample is selected.

![gauge](https://user-images.githubusercontent.com/69124282/100138402-fb6c1c00-2e5b-11eb-9302-017489b7831c.jpg)


