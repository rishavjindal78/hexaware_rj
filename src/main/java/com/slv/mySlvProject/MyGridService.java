package com.slv.mySlvProject;

import java.util.ArrayList;
import java.util.List;

public class MyGridService 
{
	
	public List<MyGridRow> getAllRows()
	{
		List<MyGridRow> myRows = new ArrayList<MyGridRow>();
		
		MyGridRow ob;
		int counter = 0;
		int revCounter=1000;
		for(int i=0;i<1000000;i++)
		{
			counter++;
			if(i%3==0 )
			{
				ob = new MyGridRow("scorpio ","Dravid1",counter,"22/06/2017","street","India","maharastra",
					12346,25000,"kanpur","badlpur","nagpur",12345);
			}
			else if(i%3==1 )
			{
				ob = new MyGridRow("scorpio ","Dravid",counter,"25/12/2014","street","Dubai","maharastra",
					12346,25000,"kanpur","badlpur","nagpur",12345);
			}
			else
			{
				ob = new MyGridRow("scorpio ","Dravid",counter,"12/05/2016","street","USA","maharastra",
						12346,25000,"kanpur","badlpur","nagpur",12345);
			}
			revCounter--;
			myRows.add(ob);
		}
		System.out.println(myRows.size());
		
		try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return myRows;
		
	}
	
	/*public List<RowHandsOn> getAllHandsOnRows()
	{
		List<RowHandsOn> myRows = new ArrayList<RowHandsOn>();
		
		RowHandsOn ob;
		int counter = 0;
		for(int i=0;i<1000;i++)
		{
			counter++;
			ob = new RowHandsOn("scorpio ","Xyz","street","22-05-2017");
			myRows.add(ob);
		}
		System.out.println(myRows.size());
		
		try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return myRows;
		
	}*/
}
