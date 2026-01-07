'use client';

import { useState, useMemo } from 'react';
import { KnowledgeGraphViewer, SubgraphViewer } from '@/app/components/KnowledgeGraph/KnowledgeGraphViewer';
import {
  createPopulatedKnowledgeGraph,
  KnowledgeGraphService,
  type KGNode,
  type KGNodeType,
} from '@/lib/knowledge-graph';

export default function KnowledgeGraphDemoPage() {
  const [selectedNode, setSelectedNode] = useState<KGNode | null>(null);
  const [viewMode, setViewMode] = useState<'full' | 'subgraph'>('full');
  const [subgraphDepth, setSubgraphDepth] = useState(1);

  // Create populated graph
  const graph = useMemo(() => createPopulatedKnowledgeGraph(), []);

  // Get all nodes and edges
  const allNodes = useMemo(() => graph.getAllNodes(), [graph]);
  const allEdges = useMemo(() => graph.getAllEdges(), [graph]);

  // Get subgraph when a node is selected
  const subgraph = useMemo(() => {
    if (!selectedNode) return null;
    return graph.getSubgraph(selectedNode.id, subgraphDepth);
  }, [graph, selectedNode, subgraphDepth]);

  // Stats
  const stats = useMemo(() => graph.getStats(), [graph]);

  // Handle node click
  const handleNodeClick = (node: KGNode) => {
    setSelectedNode(node);
    if (viewMode === 'full') {
      setViewMode('subgraph');
    }
  };

  // Export to Cypher
  const handleExportCypher = () => {
    const cypher = graph.exportToCypher();
    const blob = new Blob([cypher.script], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'darwin-mfc-knowledge-graph.cypher';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Knowledge Graph Demo
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Interactive visualization of medical knowledge relationships. Click nodes to explore connections.
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            {stats.nodesByType.Disease || 0}
          </div>
          <div className="text-sm text-red-700 dark:text-red-300">Diseases</div>
        </div>
        <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-lg">
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
            {stats.nodesByType.Symptom || 0}
          </div>
          <div className="text-sm text-amber-700 dark:text-amber-300">Symptoms</div>
        </div>
        <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {stats.nodesByType.Medication || 0}
          </div>
          <div className="text-sm text-blue-700 dark:text-blue-300">Medications</div>
        </div>
        <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {stats.nodesByType.Examination || 0}
          </div>
          <div className="text-sm text-green-700 dark:text-green-300">Examinations</div>
        </div>
        <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-lg">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {stats.totalEdges}
          </div>
          <div className="text-sm text-purple-700 dark:text-purple-300">Relationships</div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('full')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === 'full'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Full Graph
          </button>
          <button
            onClick={() => setViewMode('subgraph')}
            disabled={!selectedNode}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === 'subgraph'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Subgraph View
          </button>
        </div>

        {viewMode === 'subgraph' && (
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 dark:text-gray-400">Depth:</label>
            <select
              value={subgraphDepth}
              onChange={(e) => setSubgraphDepth(Number(e.target.value))}
              className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value={1}>1 hop</option>
              <option value={2}>2 hops</option>
              <option value={3}>3 hops</option>
            </select>
          </div>
        )}

        <button
          onClick={handleExportCypher}
          className="px-4 py-2 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700 transition-colors ml-auto"
        >
          Export to Neo4j (Cypher)
        </button>
      </div>

      {/* Selected Node Info */}
      {selectedNode && (
        <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-medium px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                {selectedNode.type}
              </span>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                {selectedNode.label}
              </h3>
              {selectedNode.synonyms && selectedNode.synonyms.length > 0 && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Also known as: {selectedNode.synonyms.join(', ')}
                </p>
              )}
            </div>
            <button
              onClick={() => {
                setSelectedNode(null);
                setViewMode('full');
              }}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Graph Visualization */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        {viewMode === 'full' ? (
          <KnowledgeGraphViewer
            nodes={allNodes}
            edges={allEdges}
            onNodeClick={handleNodeClick}
            title="Darwin-MFC Medical Knowledge Graph"
            height="700px"
          />
        ) : subgraph ? (
          <SubgraphViewer
            subgraph={subgraph}
            onNodeClick={handleNodeClick}
            title={`Connections: ${selectedNode?.label}`}
            height="700px"
          />
        ) : (
          <div className="h-[700px] flex items-center justify-center text-gray-500">
            Select a node to view its subgraph
          </div>
        )}
      </div>

      {/* Edge Type Legend */}
      <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
          Relationship Types
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-blue-500"></div>
            <span className="text-gray-600 dark:text-gray-400">TREATS</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-green-500"></div>
            <span className="text-gray-600 dark:text-gray-400">FIRST LINE FOR</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-amber-500"></div>
            <span className="text-gray-600 dark:text-gray-400">MANIFESTS AS</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-emerald-500"></div>
            <span className="text-gray-600 dark:text-gray-400">DIAGNOSED BY</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 bg-red-600 animate-pulse"></div>
            <span className="text-gray-600 dark:text-gray-400">INTERACTS WITH</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 bg-red-900 animate-pulse"></div>
            <span className="text-gray-600 dark:text-gray-400">CONTRAINDICATED</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-purple-500"></div>
            <span className="text-gray-600 dark:text-gray-400">INVOLVES PATHWAY</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-indigo-500"></div>
            <span className="text-gray-600 dark:text-gray-400">COMORBID WITH</span>
          </div>
        </div>
      </div>
    </div>
  );
}
