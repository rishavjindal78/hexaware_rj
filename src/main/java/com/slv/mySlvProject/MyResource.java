package com.slv.mySlvProject;

import java.util.List;
import java.util.Map;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.glassfish.jersey.server.ResourceConfig;


/**
 * Root resource (exposedO at "myresource" path)
 */
@Path("/abc")
public class MyResource extends ResourceConfig {

	MyGridService ob = new MyGridService();
	
    @GET
    @Path("/1")
    @Produces(MediaType.TEXT_PLAIN)
    public String getIt() {
        return "Got it!";
    }
    
    public MyResource() 
    {
    	register(CORSFilter.class);
    }
    
    @GET   
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/2")
    public List<MyGridRow>  getGridRows(@QueryParam("myvar") String myVa) 
    {	    	
    	System.out.println("kunal we are here "+myVa);
        return ob.getAllRows();
    }


}
