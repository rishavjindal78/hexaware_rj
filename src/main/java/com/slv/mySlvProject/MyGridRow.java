package com.slv.mySlvProject;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class MyGridRow 
{
	private String make;
	private String model;
	private int price;
	private String date;
	private String landmark;
	private String country;
	private String state;
	private int pinCode;
	private int price1;
	private String landmark1;
	private String country1;
	private String state1;
	private int pinCode1;
	
	
	public int getPinCode() {
		return pinCode;
	}

	public void setPinCode(int pinCode) {
		this.pinCode = pinCode;
	}

	public int getPrice1() {
		return price1;
	}

	public void setPrice1(int price1) {
		this.price1 = price1;
	}

	public int getPinCode1() {
		return pinCode1;
	}

	public void setPinCode1(int pinCode1) {
		this.pinCode1 = pinCode1;
	}

	MyGridRow()
	{
		
	}
	
	MyGridRow(String make, String model, int price, String date, String landmark,
			String country, String state, int pinCode, int price1, String landmark1,
			String country1, String state1,int pinCode1 
			)
	{
		this.make = make;
		this.model = model;
		this.price = price;
		this.date = date;
		this.landmark = landmark;
		this.country = country;
		this.state = state;
		this.pinCode = pinCode;
		this.price1 = price1;
		this.landmark1 = landmark1;
		this.country1 = country1;
		this.state1 = state1;
		this.pinCode1 = pinCode1;
	}

	public String getMake() {
		return make;
	}

	public void setMake(String make) {
		this.make = make;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getLandmark() {
		return landmark;
	}

	public void setLandmark(String landmark) {
		this.landmark = landmark;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}



	public String getLandmark1() {
		return landmark1;
	}

	public void setLandmark1(String landmark1) {
		this.landmark1 = landmark1;
	}

	public String getCountry1() {
		return country1;
	}

	public void setCountry1(String country1) {
		this.country1 = country1;
	}

	public String getState1() {
		return state1;
	}

	public void setState1(String state1) {
		this.state1 = state1;
	}


	

	
	
}
