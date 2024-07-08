 
 
 
 ................................................................................
 
 we have four main funtions:



1st one is called : getMealData()

it is a general function to get all data and choose the meals property



2nd one is called : getCategoryData()

it is a general function to get all data nd choose the categories property



3rd one is called : Displayer()

it takes a name and display a searched list that matches the name (val)
and takes the location (loc) where we display the output
and on it when we use the (SearchAndDisplayByID) function we pass to it the same location and id
there are two modes for the function
if the mode= search so now we can search by name (by making type=s)
or search by first letter (by making type = f)
the second mode is mode = filter , the samething we have :
type = a for getting meals of specific area , type = c for getting the meals of specific category 
finally type = i for getting meals of specific ingredient



4th one is called : SearchAndDisplayByID()

it takes an id and display a searched list  matches that  id  (id)
and takes the location from the {3rd} function [where we display the output]
it means we display the list by 3rd function and when we click on any item the 4th one fires 



........................................................

API part :


a function is called categoryDisplay():

we here display all categories list in categories page
first, we fetch all categories and display it 
when we choose one category and click on it ,then fires the Displayer (3rd function)
then 3rd one will display a list of meals and when we choose on of them ,it  fires SearchAndDisplayByID (4th)
then 4rd one will display all data about the choosed meal
(all this will be displayed in  category section because we passed loc='#category-inner' in the 3rd func)



.............................................................