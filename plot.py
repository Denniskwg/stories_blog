#!/usr/bin/env python3
import matplotlib.pyplot as plt

#plt.ion()

# Sample data
#x = [1, 2, 3, 4, 5]
#y = [2, 4, 6, 8, 10]

# Create a line plot
#plt.plot(x, y)

# Add labels and title
#plt.xlabel('X-axis label')
#plt.ylabel('Y-axis label')
#plt.title('Simple Line Plot')

# Show the plot
#plt.savefig("example.png")


# Sample data: Product names, prices, and features
products = ['Product A', 'Product B', 'Product C', 'Product D', 'Product E']
prices = [200, 150, 100, 120, 180]
features = [3, 4, 5, 2, 4]

# Create a scatter plot
plt.figure(figsize=(8, 6))
plt.scatter(prices, features, c='blue', marker='o')

# Label each point with the product name
for i, product in enumerate(products):
    plt.text(prices[i], features[i], product, fontsize=10, ha='right', va='bottom')

# Add labels and title
plt.xlabel('Price')
plt.ylabel('Features')
plt.title('Market Map - Competitive Analysis')

# Customize the plot as needed
plt.grid(True)
plt.axhline(0, color='black',linewidth=0.5)
plt.axvline(0, color='black',linewidth=0.5)

# Show the plot
plt.savefig("example.png")

