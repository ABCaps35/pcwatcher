package com.abcapelli.pcwatcher.controllers;

import java.util.List;

import org.json.simple.JSONObject;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.profesorfalken.jsensors.JSensors;
import com.profesorfalken.jsensors.model.components.Components;
import com.profesorfalken.jsensors.model.components.Cpu;
import com.profesorfalken.jsensors.model.components.Gpu;
import com.profesorfalken.jsensors.model.components.Mobo;
import com.profesorfalken.jsensors.model.sensors.Fan;
import com.profesorfalken.jsensors.model.sensors.Load;
import com.profesorfalken.jsensors.model.sensors.Temperature;

import oshi.SystemInfo;
import oshi.hardware.CentralProcessor;
import oshi.hardware.HardwareAbstractionLayer;
import oshi.hardware.Sensors;

@RestController
public class SpecFetcher {
	Components components;
	SystemInfo si;
	HardwareAbstractionLayer hal;
	Sensors sens;
	boolean canRun;
	
	public SpecFetcher(){
		components = JSensors.get.components();
		si = new SystemInfo();
		hal = si.getHardware();
		sens = hal.getSensors();
		canRun = true;
	}
	
	@RequestMapping("/api/index")
	public String index() {
		return "Hello World!";
	}
	
	//gets cpu load, ram load, gpu load, vram load, and gpu temp
	@GetMapping("/api/fetch/jsensors")
	//change output to JSONObject
	public void getJSData() {
		System.out.println("enter");
		List<Cpu> cpus = components.cpus;
		
		if (cpus != null) {
	        for (final Cpu cpu : cpus) {
	            System.out.println("Found CPU component: " + cpu.name);
	            if (cpu.sensors != null) {
	            	System.out.println("Sensors: ");
		            System.out.println("Sensor Count: " + (cpu.sensors.temperatures.size() + cpu.sensors.fans.size() + cpu.sensors.loads.size()));
		            System.out.println("Temp Sensors: " + cpu.sensors.temperatures.size());
		            System.out.println("Fan Sensors: " + cpu.sensors.fans.size());
		            System.out.println("Load Sensors: " + cpu.sensors.loads.size());

		            //Print loads
		            List<Load> loads = cpu.sensors.loads;
		            for (final Load load : loads) {
		            	if(load.name.equals("Load CPU Total") || load.name.equals("Load Memory")) {
		            		System.out.println(load.name + ": " + load.value + "%");
		            	}
		            }
		            //Print temperatures
		            List<Temperature> temps = cpu.sensors.temperatures;
		            for (final Temperature temp : temps) {
		                System.out.println(temp.name + ": " + temp.value + " C");
		            }
		  
		            //Print fan speed
		            List<Fan> fans = cpu.sensors.fans;
		            for (final Fan fan : fans) {
		                System.out.println(fan.name + ": " + fan.value + " RPM");
		            }
	            }
	        }
	    }
		List<Gpu> gpus = components.gpus;
		if (gpus != null) {
	        for (final Gpu gpu : gpus) {
	            System.out.println("Found GPU component: " + gpu.name);
	            if (gpu.sensors != null) {
	              System.out.println("Sensors: ");
	              
	            //Print loads
	              List<Load> loads = gpu.sensors.loads;
	              for (final Load load : loads) {
	                  System.out.println(load.name + ": " + load.value + "%");
	              }
	  
	              //Print temperatures
	              List<Temperature> temps = gpu.sensors.temperatures;
	              for (final Temperature temp : temps) {
	                  System.out.println(temp.name + ": " + temp.value + " C");
	              }
	  
	              //Print fan speed
	              List<Fan> fans = gpu.sensors.fans;
	              for (final Fan fan : fans) {
	                  System.out.println(fan.name + ": " + fan.value + " RPM");
	              }
	            }
	        }
	    }
		
		List<Mobo> mobos = components.mobos;
		if (mobos != null) {
	        for (final Mobo mobo : mobos) {
	            System.out.println("Found Mobo component: " + mobo.name);
	            if (mobo.sensors != null) {
	              System.out.println("Sensors: ");
	              
	            //Print loads
	              List<Load> loads = mobo.sensors.loads;
	              for (final Load load : loads) {
	                  System.out.println(load.name + ": " + load.value + "%");
	              }
	  
	              //Print temperatures
	              List<Temperature> temps = mobo.sensors.temperatures;
	              for (final Temperature temp : temps) {
	                  System.out.println(temp.name + ": " + temp.value + " C");
	              }
	  
	              //Print fan speed
	              List<Fan> fans = mobo.sensors.fans;
	              for (final Fan fan : fans) {
	                  System.out.println(fan.name + ": " + fan.value + " RPM");
	              }
	            }
	        }
	    }
	}
	
	@GetMapping("/api/fetch/oshi")
	public void getOshiData() {
		CentralProcessor cpu = hal.getProcessor();
		
		System.out.println(sens.getCpuTemperature()+" C");
		
		int[] speeds = sens.getFanSpeeds();
		System.out.println(speeds.length);
		for (int speed : speeds) {
			System.out.println(speed+" RPM");
		}
		System.out.println(sens.getFanSpeeds());
	}
	
	@CrossOrigin(origins="http://localhost:3000")
	@GetMapping("/api/fetch")
	public JSONObject getFullData () {
		JSONObject out = new JSONObject();
		if(canRun=false) {
			return null;
		}
		
		canRun = false;
		//This step is really slow, like 3 seconds slow. If possible, find alternative to substitute in
		//Or just take front end over to C#, where there's native libraries for this stuff...
		components = JSensors.get.components();

		List<Cpu> cpus = components.cpus;
		if (cpus != null) {
	        for (final Cpu cpu : cpus) {
	        	out.put("cpu_name", cpu.name);
	            if (cpu.sensors != null) {
		            List<Load> loads = cpu.sensors.loads;
		            for (final Load load : loads) {
		            	if(load.name.equals("Load CPU Total")) {
		            		out.put("cpu_load", load.value);
		            	}
		            	else if( load.name.equals("Load Memory")){
		            		out.put("dram_load", load.value);
		            	}
		            }
	            }
	        }
	    }
		
		out.put("cpu_temp", sens.getCpuTemperature());
		
		//Assumes 1 GPU, slight mod may be necessary if there is more than 1 present
		List<Gpu> gpus = components.gpus;
		if (gpus != null) {
	        for (final Gpu gpu : gpus) {
	            out.put("gpu_name", gpu.name);
	            if (gpu.sensors != null) {
		            for (final Load load : gpu.sensors.loads) {
		            	if(load.name.equals("Load GPU Core")) {
		            		out.put("gpu_load", load.value);
		            	}
		            	else if(load.name.equals("Load GPU Memory")) {
		            		out.put("vram_load", load.value);
		            	}
		            }
		            for (final Temperature temp : gpu.sensors.temperatures) {
		                out.put("gpu_temp", temp.value);
		            }
	            }
	        }
	    }
		canRun = true;
		return out;
	}
}
