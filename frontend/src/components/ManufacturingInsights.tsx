import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, TrendingDown, AlertCircle, CheckCircle2, Lightbulb, Factory } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useState } from 'react';

const failureData = [
  { component: 'Brake Pads', failures: 45, cost: 67500 },
  { component: 'Battery Cells', failures: 32, cost: 192000 },
  { component: 'Suspension', failures: 28, cost: 84000 },
  { component: 'Coolant Pump', failures: 21, cost: 42000 },
  { component: 'Sensors', failures: 18, cost: 27000 },
];

const trendData = [
  { month: 'Jan', failures: 45, resolved: 42 },
  { month: 'Feb', failures: 52, resolved: 48 },
  { month: 'Mar', failures: 48, resolved: 45 },
  { month: 'Apr', failures: 39, resolved: 38 },
  { month: 'May', failures: 35, resolved: 34 },
  { month: 'Jun', failures: 28, resolved: 28 },
];

const rootCauseData = [
  { name: 'Material Quality', value: 35, color: '#00FFFF' },
  { name: 'Design Flaw', value: 25, color: '#8FFF6F' },
  { name: 'Manufacturing Defect', value: 20, color: '#FFB347' },
  { name: 'External Factors', value: 15, color: '#9D4EDD' },
  { name: 'Others', value: 5, color: '#FF4466' },
];

const capaActions = [
  {
    issue: 'Battery Cell Degradation',
    rootCause: 'Thermal management inadequate in high-temperature regions',
    action: 'Implement enhanced cooling system in next production batch',
    status: 'in-progress',
    impact: 'High',
  },
  {
    issue: 'Brake Pad Wear',
    rootCause: 'Material composition not optimal for Indian driving conditions',
    action: 'Partner with material science team for formulation update',
    status: 'approved',
    impact: 'High',
  },
  {
    issue: 'Sensor Calibration Drift',
    rootCause: 'Environmental humidity affecting sensor accuracy',
    action: 'Add protective coating and recalibration protocol',
    status: 'completed',
    impact: 'Medium',
  },
];

const designImprovements = [
  {
    title: 'Enhanced Battery Thermal Management',
    description: 'Implement liquid cooling system for better heat dissipation',
    expectedReduction: '40% fewer battery failures',
    investment: '₹2.5Cr',
  },
  {
    title: 'Brake Material Upgrade',
    description: 'Use ceramic-composite pads with longer lifespan',
    expectedReduction: '35% reduction in brake replacements',
    investment: '₹1.2Cr',
  },
  {
    title: 'Predictive Sensor Recalibration',
    description: 'AI-driven sensor health monitoring and auto-calibration',
    expectedReduction: '50% fewer sensor-related failures',
    investment: '₹80L',
  },
];

interface ManufacturingProps {
  data?: any;
}

export function ManufacturingInsights({ data }: ManufacturingProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    
    try {
      const element = document.getElementById('rca-report-content');
      if (!element) {
        throw new Error('Report content element not found');
      }

      // Wait for charts to render
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simple approach: capture as rendered (no CSS parsing issues)
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#0a0a0a',
        logging: false,
        useCORS: true,
        allowTaint: true,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });

      // Convert to image
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      
      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height, undefined, 'FAST');

      // Download
      pdf.save(`RCA_Report_${new Date().toISOString().split('T')[0]}.pdf`);

    } catch (error) {
      console.error('PDF generation error:', error);
      alert(`Failed to generate PDF. ${error instanceof Error ? error.message : 'Please try again.'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl mb-2 text-primary">Manufacturing Insights</h1>
            <p className="text-muted-foreground">AI-generated RCA/CAPA reports for continuous improvement</p>
          </div>
          <Button 
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            <Download className="w-4 h-4" />
            {isGenerating ? 'Generating PDF...' : 'Download RCA Report (PDF)'}
          </Button>
        </motion.div>

        {/* Report Content - Wrapped for PDF generation */}
        <div id="rca-report-content">
        {/* Top 5 Component Failures (derived from diagnosis past issues when available) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <Factory className="w-6 h-6 text-primary" />
              <h2 className="text-primary">Top 5 Recurring Component Failures</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={
                (data?.diagnosis?.past_issues && data.diagnosis.past_issues.length)
                  ? data.diagnosis.past_issues.map((p: any) => ({ component: p.last_issue, failures: 1, cost: p.repair_cost || 0 }))
                  : failureData
              }>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="component" stroke="#8B92A0" />
                <YAxis stroke="#8B92A0" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1C1F26', border: '1px solid rgba(0,255,255,0.2)' }}
                  formatter={(value, name) => [name === 'failures' ? `${value} cases` : `₹${value}`, name === 'failures' ? 'Failures' : 'Total Cost']}
                />
                <Legend />
                <Bar dataKey="failures" fill="#00FFFF" radius={[8, 8, 0, 0]} />
                <Bar dataKey="cost" fill="#FFB347" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Trend Analysis & Root Cause */}
        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 h-full">
              <div className="flex items-center gap-3 mb-6">
                <TrendingDown className="w-6 h-6 text-secondary" />
                <h2 className="text-primary">Failure Trend (6 Months)</h2>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={
                  // if diagnosis exists, create a small trend from days_to_failure
                  data?.diagnosis ? [{ month: 'Now', failures: 1, resolved: 0 }, { month: 'Next', failures: 0, resolved: 0 }] : trendData
                }>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="#8B92A0" />
                  <YAxis stroke="#8B92A0" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1C1F26', border: '1px solid rgba(0,255,255,0.2)' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="failures" stroke="#FF4466" strokeWidth={2} dot={{ fill: '#FF4466' }} />
                  <Line type="monotone" dataKey="resolved" stroke="#8FFF6F" strokeWidth={2} dot={{ fill: '#8FFF6F' }} />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 p-4 rounded-lg bg-secondary/10 border border-secondary/30">
                <p className="text-sm text-secondary">↓ 38% reduction in failures over 6 months</p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 h-full">
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="w-6 h-6 text-accent" />
                <h2 className="text-primary">Root Cause Distribution</h2>
              </div>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={
                        // create a small root cause breakdown based on diagnosis
                        data?.diagnosis ? [
                          { name: data.diagnosis.failure || 'Unknown', value: 70, color: '#FF4466' },
                          { name: 'Other', value: 30, color: '#8FFF6F' }
                        ] : rootCauseData
                      }
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {(data?.diagnosis ? [
                        { name: data.diagnosis.failure || 'Unknown', value: 70, color: '#FF4466' },
                        { name: 'Other', value: 30, color: '#8FFF6F' }
                      ] : rootCauseData).map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1C1F26', border: '1px solid rgba(0,255,255,0.2)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* CAPA Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle2 className="w-6 h-6 text-secondary" />
              <h2 className="text-primary">Root Cause & CAPA Actions</h2>
            </div>
            <div className="space-y-4">
              {capaActions.map((action, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="p-5 rounded-lg bg-muted/30 border border-border/30"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-foreground mb-1">{action.issue}</h4>
                      <Badge variant={
                        action.status === 'completed' ? 'default' :
                        action.status === 'in-progress' ? 'secondary' :
                        'outline'
                      } className="text-xs">
                        {action.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    <Badge variant={action.impact === 'High' ? 'destructive' : 'outline'}>
                      {action.impact} Impact
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Root Cause: </span>
                      <span className="text-foreground">{action.rootCause}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Corrective Action: </span>
                      <span className="text-secondary">{action.action}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Design Improvements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="w-6 h-6 text-accent" />
              <h2 className="text-primary">Suggested Design Improvements</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {designImprovements.map((improvement, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="p-5 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30"
                >
                  <h4 className="mb-2 text-foreground">{improvement.title}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{improvement.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-secondary" />
                      <span className="text-sm text-secondary">{improvement.expectedReduction}</span>
                    </div>
                    <div className="pt-2 border-t border-border/30">
                      <span className="text-xs text-muted-foreground">Investment: </span>
                      <span className="text-sm text-accent">{improvement.investment}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { label: 'Total Failures Analyzed', value: '144', color: '#00FFFF' },
            { label: 'CAPA Actions Implemented', value: '12', color: '#8FFF6F' },
            { label: 'Cost Savings (Annual)', value: '₹4.2Cr', color: '#FFB347' },
            { label: 'Quality Improvement', value: '+38%', color: '#9D4EDD' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + i * 0.05 }}
            >
              <Card className="p-6 text-center bg-card/50 backdrop-blur-sm border-border/50">
                <p className="text-3xl mb-2" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>
        </div>
        {/* End of Report Content */}
      </div>
    </div>
  );
}
