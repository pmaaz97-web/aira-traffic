package maazpashaprogram;
public class maazpg3
{
private int x;
private int y;
public maazpg3() // Default constructor
{
this.x = 0;
 this.y = 0;
}
 // Overloaded constructor with given x and y coordinates
public maazpg3(int x, int y) 
{
this.x = x;
 this.y = y;
}
public void setXY(int x, int y) // Method to set both x and y
{
this.x = x;
 this.y = y;
}
 // Method to get the x and y coordinates in a 2-element int array
public int[] getXY() 
{
int[] coordinates = {x, y};
 return coordinates;
}
 // Method to return a string description of the instance in the format "(x, y)"
public String toString() 
{
return "(" + x + ", " + y + ")";
}
 // Method to calculate the distance from this point to another point at (x, y) coordinates
public double distance(int x, int y) 
{
int xDiff = this.x - x;
int yDiff = this.y - y;
 return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}
 // Overloaded method to calculate the distance from this point to another MyPoint instance
public double distance(maazpg3 another) 
{
int xDiff = this.x - another.x;
 int yDiff = this.y - another.y;
 return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}
 // Overloaded method to calculate the distance from this point to the origin (0,0)
public double distance() 
{
return Math.sqrt(x * x + y * y);
}
public static void main(String[] args) 
{
maazpg3 point1 = new maazpg3(3, 4); // Create two MyPoint instances
maazpg3 point2 = new maazpg3(6, 8);
point1.setXY(1, 2); // Test the setXY method
int[] point1Coordinates = point1.getXY(); // Test the getXY method
System.out.println("Point 1 coordinates: (" + point1Coordinates[0] + ", " + 
point1Coordinates[1] + ")");
// Test the toString method
 System.out.println("Point 2 coordinates: " + point2.toString());
double distance1 = point1.distance(5, 6); // Test the distance methods
 double distance2 = point1.distance(point2);
 double distance3 = point2.distance();
 
 System.out.println("Distance from point1 to (5, 6): " + distance1);
 System.out.println("Distance from point1 to point2: " + distance2);
 System.out.println("Distance from point2 to the origin: " + distance3);
}
}