package maazpashaprogram;

abstract class Shape 
{
public abstract double calculateArea(); // Abstract method to calculate the area
public abstract double calculatePerimeter(); // Abstract method to calculate the
perimeter
}
class Circle extends Shape 
{
private double radius;
public Circle(double radius) 
{
this.radius = radius;
}
@Override
public double calculateArea() 
{
return Math.PI * radius * radius;
}
 @Override
public double calculatePerimeter()
}
return Math.PI * radius * radius;
}
 @Override
public double calculatePerimeter() 
{
return 2 * Math.PI * radius;
}
}
class Triangle extends Shape 
{
private double sideA;
private double sideB;
private double sideC;

	