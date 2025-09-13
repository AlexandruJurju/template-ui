// test-signalr.component.ts
import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HubConnection, HubConnectionBuilder} from '@microsoft/signalr';

@Component({
  selector: 'app-test-signalr',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-signalr.html',
  styleUrl: './test-signalr.css'
})
export class TestSignalr implements OnInit, OnDestroy {
  ngOnInit(): void {
    this.setupConnection();
  }

  private hubConnection!: HubConnection;
  connectionStatus = 'Disconnected';
  latestNumbers: number[] = [];
  logs: Array<{ timestamp: Date, message: string, type: string }> = [];


  private setupConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:5001/random-number-hub')
      .build();

    // Handle incoming random numbers (from your IRandomNumberHub interface)
    this.hubConnection.on('ReceiveRandomNumbers', (numbers: number[]) => {
      this.latestNumbers = numbers;
      this.addLog(`Received ${numbers.length} numbers: [${numbers.join(', ')}]`, 'success');
    });

    // Handle connection established (from your OnConnectedAsync)
    this.hubConnection.on('Connected', (connectionId: string) => {
      this.addLog(`Connected with ID: ${connectionId}`, 'success');
    });

    // Handle user joined group (from your JoinGroup method)
    this.hubConnection.on('UserJoined', (connectionId: string, groupName: string) => {
      this.addLog(`User ${connectionId} joined group: ${groupName}`, 'info');
    });

    // Handle user left group (from your LeaveGroup method)
    this.hubConnection.on('UserLeft', (connectionId: string, groupName: string) => {
      this.addLog(`User ${connectionId} left group: ${groupName}`, 'info');
    });

    // Connection state handlers
    this.hubConnection.onreconnecting(() => {
      this.connectionStatus = 'Reconnecting';
      this.addLog('Connection lost, attempting to reconnect...', 'warning');
    });

    this.hubConnection.onreconnected(() => {
      this.connectionStatus = 'Connected';
      this.addLog('Reconnected successfully!', 'success');
    });

    this.hubConnection.onclose(() => {
      this.connectionStatus = 'Disconnected';
      this.addLog('Connection closed', 'error');
    });
  }

  async connect() {
    try {
      this.connectionStatus = 'Connecting';
      this.addLog('Attempting to connect...', 'info');

      await this.hubConnection.start();
      this.connectionStatus = 'Connected';
      this.addLog('Connected successfully!', 'success');
    } catch (error) {
      this.connectionStatus = 'Disconnected';
      this.addLog(`Connection failed: ${error}`, 'error');
      console.error('SignalR connection error:', error);
    }
  }

  async disconnect() {
    try {
      await this.hubConnection.stop();
      this.connectionStatus = 'Disconnected';
      this.addLog('Disconnected', 'info');
    } catch (error) {
      this.addLog(`Disconnect error: ${error}`, 'error');
    }
  }

  async requestNumbers() {
    if (this.isConnected) {
      try {
        this.addLog('Requesting random numbers...', 'info');
        await this.hubConnection.invoke('RequestRandomNumbers');
      } catch (error) {
        this.addLog(`Request failed: ${error}`, 'error');
      }
    }
  }

  async joinTestGroup() {
    if (this.isConnected) {
      try {
        this.addLog('Joining test group...', 'info');
        await this.hubConnection.invoke('JoinGroup', 'testGroup');
      } catch (error) {
        this.addLog(`Join group failed: ${error}`, 'error');
      }
    }
  }

  async leaveTestGroup() {
    if (this.isConnected) {
      try {
        this.addLog('Leaving test group...', 'info');
        await this.hubConnection.invoke('LeaveGroup', 'testGroup');
      } catch (error) {
        this.addLog(`Leave group failed: ${error}`, 'error');
      }
    }
  }

  get isConnected(): boolean {
    return this.connectionStatus === 'Connected';
  }

  getStatusClass(): string {
    switch (this.connectionStatus) {
      case 'Connected':
        return 'connected';
      case 'Connecting':
        return 'connecting';
      default:
        return 'disconnected';
    }
  }

  private addLog(message: string, type: string) {
    this.logs.push({
      timestamp: new Date(),
      message,
      type
    });

    // Keep only last 50 logs
    if (this.logs.length > 50) {
      this.logs = this.logs.slice(-50);
    }
  }

  clearLogs() {
    this.logs = [];
  }

  ngOnDestroy() {
    if (this.hubConnection) {
      this.hubConnection.stop().catch(console.error);
    }
  }
}
