/**
 * Interactive LangGraph Agentic Workflow Visualizer
 * Simulates the real production multi-agent automation platform Daniel architected at Equifax.
 */

document.addEventListener('DOMContentLoaded', () => {
  initAgentVisualizer();
});

function initAgentVisualizer() {
  const runBtn = document.getElementById('run-sim-btn');
  const stepBtn = document.getElementById('step-sim-btn');
  const resetBtn = document.getElementById('reset-sim-btn');
  const terminalLogs = document.getElementById('agent-terminal-logs');
  const statePayload = document.getElementById('agent-state-payload');
  const nodePills = document.querySelectorAll('.vis-node');

  if (!runBtn || !terminalLogs) return;

  const simulationSteps = [
    {
      step: 1,
      nodeId: 'node-trigger',
      name: 'CI Trigger & Ingestion',
      log: '[TRIGGER] Ingesting regression test suite: 420 E2E test scenarios across 6 enterprise services...',
      state: {
        run_id: "eqx-run-9842",
        status: "INITIALIZING",
        test_suites_queued: 420,
        active_agents: 0,
        self_healed_count: 0,
        saved_hours_metric: "calculating..."
      }
    },
    {
      step: 2,
      nodeId: 'node-supervisor',
      name: 'LangGraph Supervisor Agent',
      log: '[SUPERVISOR] Graph state compiled. Orchestrating sub-graphs into 4 parallel execution clusters...',
      state: {
        run_id: "eqx-run-9842",
        status: "ORCHESTRATING",
        test_suites_queued: 420,
        cluster_distribution: ["Auth-Service", "Credit-Score-UI", "Dispute-Portal", "Payment-Gateway"],
        active_agents: 4,
        self_healed_count: 0
      }
    },
    {
      step: 3,
      nodeId: 'node-workers',
      name: 'Parallel Worker Agent Fleet',
      log: '[WORKERS] Spawning 8 headless browser containers. Executing Selenium user journeys in parallel...',
      state: {
        run_id: "eqx-run-9842",
        status: "EXECUTING",
        scenarios_passed: 398,
        scenarios_failed_stale_dom: 14,
        active_agents: 8,
        memory_usage_mb: 512
      }
    },
    {
      step: 4,
      nodeId: 'node-healing',
      name: 'Self-Healing & LLM Reflection Node',
      log: '[REFLECTION] 14 DOM locator mismatches detected. Invoking LLM Reflection Node... Selectors healed dynamically without human intervention!',
      state: {
        run_id: "eqx-run-9842",
        status: "HEALING_COMPLETE",
        scenarios_passed: 412,
        self_healed_count: 14,
        success_rate: "98.1%",
        manual_intervention_prevented: "14 hours saved"
      }
    },
    {
      step: 5,
      nodeId: 'node-telemetry',
      name: 'BigQuery Telemetry & Slack Alert',
      log: '[TELEMETRY] Regression cycle finalized in 38m (vs 3 weeks legacy). Pushed metrics to BigQuery & broadcasted executive summary to Slack.',
      state: {
        run_id: "eqx-run-9842",
        status: "COMPLETED",
        total_scenarios: 420,
        overall_pass_rate: "99.4%",
        regression_duration: "38 minutes",
        monthly_hours_saved_contribution: "640 hrs/month",
        telemetry_target: "GCP BigQuery (FinTech_Lake.Test_Metrics)"
      }
    }
  ];

  let currentStepIndex = -1;
  let isRunningAuto = false;
  let autoTimer = null;

  function appendLog(text, isHighlight = false) {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    const logLine = document.createElement('div');
    logLine.className = `font-mono text-xs my-1 flex gap-2 ${isHighlight ? 'text-emerald-400 font-semibold' : 'text-slate-300'}`;
    logLine.innerHTML = `<span class="text-slate-500">[${time}]</span> <span>${text}</span>`;
    terminalLogs.appendChild(logLine);
    terminalLogs.scrollTop = terminalLogs.scrollHeight;
  }

  function updateVisuals(stepData) {
    // Reset all nodes
    nodePills.forEach(n => {
      n.classList.remove('active-node', 'border-cyan-400', 'bg-cyan-950/40', 'ring-2', 'ring-cyan-500/50');
    });

    const activeNode = document.getElementById(stepData.nodeId);
    if (activeNode) {
      activeNode.classList.add('active-node', 'border-cyan-400', 'bg-cyan-950/40', 'ring-2', 'ring-cyan-500/50');
    }

    // Update log
    appendLog(stepData.log, stepData.step === 4 || stepData.step === 5);

    // Update JSON state
    if (statePayload) {
      statePayload.textContent = JSON.stringify(stepData.state, null, 2);
    }
  }

  function stepForward() {
    if (currentStepIndex < simulationSteps.length - 1) {
      currentStepIndex++;
      updateVisuals(simulationSteps[currentStepIndex]);
    } else {
      stopAuto();
      appendLog('[SYSTEM] LangGraph execution graph completed successfully! All nodes converged.', true);
    }
  }

  function runSimulation() {
    if (isRunningAuto) {
      stopAuto();
      return;
    }

    if (currentStepIndex >= simulationSteps.length - 1) {
      resetSimulation();
    }

    isRunningAuto = true;
    runBtn.innerHTML = `<span>⏸ Pause</span>`;
    runBtn.classList.remove('bg-cyan-500/20', 'text-cyan-400');
    runBtn.classList.add('bg-amber-500/20', 'text-amber-400', 'border-amber-500/40');

    function executeNext() {
      if (!isRunningAuto) return;
      if (currentStepIndex < simulationSteps.length - 1) {
        stepForward();
        autoTimer = setTimeout(executeNext, 2000);
      } else {
        stopAuto();
      }
    }
    executeNext();
  }

  function stopAuto() {
    isRunningAuto = false;
    clearTimeout(autoTimer);
    runBtn.innerHTML = `<span>▶ Run Simulation</span>`;
    runBtn.classList.remove('bg-amber-500/20', 'text-amber-400', 'border-amber-500/40');
    runBtn.classList.add('bg-cyan-500/20', 'text-cyan-400');
  }

  function resetSimulation() {
    stopAuto();
    currentStepIndex = -1;
    terminalLogs.innerHTML = `
      <div class="font-mono text-xs text-slate-500">// LangGraph Agent Engine v0.3.1 ready. Click 'Run Simulation' to observe multi-agent orchestration.</div>
    `;
    nodePills.forEach(n => {
      n.classList.remove('active-node', 'border-cyan-400', 'bg-cyan-950/40', 'ring-2', 'ring-cyan-500/50');
    });
    if (statePayload) {
      statePayload.textContent = JSON.stringify({
        graph_state: "IDLE",
        awaiting_trigger: true,
        nodes_registered: ["Supervisor", "WorkerFleet", "LLMReflection", "BigQuerySink"]
      }, null, 2);
    }
  }

  runBtn.addEventListener('click', runSimulation);
  stepBtn.addEventListener('click', () => {
    stopAuto();
    stepForward();
  });
  resetBtn.addEventListener('click', resetSimulation);
}
