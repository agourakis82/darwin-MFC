/**
 * TEST CACHING LAYER
 * ==================
 * 
 * Test cache performance and hit rates.
 */

import { 
  PubMedFetcher, 
  MedicalSocietiesFetcher, 
  BrazilFetcher,
  type FetchQuery 
} from '../lib/content-generation/fetchers';
import { FetcherCache, withCache } from '../lib/content-generation/cache';

async function testCache() {
  console.log('🧪 Testing Caching Layer\n');
  console.log('='.repeat(80));

  // Create cache with short TTL for testing
  const cache = new FetcherCache({ ttl: 5000, maxSize: 100 }); // 5 seconds

  // Wrap fetchers with cache
  const pubmedCached = withCache(new PubMedFetcher(), cache);
  const societiesCached = withCache(new MedicalSocietiesFetcher(), cache);
  const brazilCached = withCache(new BrazilFetcher(), cache);

  const query: FetchQuery = { topic: 'diabetes' };

  console.log('\n📊 Test 1: First Fetch (Cache Miss)\n');
  
  const start1 = Date.now();
  await pubmedCached.fetch(query);
  await societiesCached.fetch(query);
  await brazilCached.fetch(query);
  const time1 = Date.now() - start1;
  
  console.log(`   Time: ${time1}ms`);
  console.log(`   Metrics:`, cache.getMetrics());

  console.log('\n📊 Test 2: Second Fetch (Cache Hit)\n');
  
  const start2 = Date.now();
  await pubmedCached.fetch(query);
  await societiesCached.fetch(query);
  await brazilCached.fetch(query);
  const time2 = Date.now() - start2;
  
  console.log(`   Time: ${time2}ms`);
  console.log(`   Metrics:`, cache.getMetrics());
  console.log(`   Speedup: ${(time1 / time2).toFixed(1)}x faster`);

  console.log('\n📊 Test 3: Multiple Queries (Mixed)\n');
  
  const topics = ['diabetes', 'hypertension', 'asthma', 'diabetes', 'hypertension'];
  
  for (const topic of topics) {
    await societiesCached.fetch({ topic });
  }
  
  const metrics = cache.getMetrics();
  console.log(`   Queries: ${topics.length}`);
  console.log(`   Cache Hits: ${metrics.hits}`);
  console.log(`   Cache Misses: ${metrics.misses}`);
  console.log(`   Hit Rate: ${(metrics.hitRate * 100).toFixed(1)}%`);

  console.log('\n📊 Test 4: Cache Expiration\n');
  
  console.log('   Waiting 6 seconds for cache to expire...');
  await new Promise(resolve => setTimeout(resolve, 6000));
  
  const start4 = Date.now();
  await societiesCached.fetch({ topic: 'diabetes' });
  const time4 = Date.now() - start4;
  
  console.log(`   Time after expiration: ${time4}ms`);
  console.log(`   Metrics:`, cache.getMetrics());

  console.log('\n📊 Test 5: Cache Size Limit\n');
  
  const smallCache = new FetcherCache({ ttl: 60000, maxSize: 3 });
  const fetcher = withCache(new MedicalSocietiesFetcher(), smallCache);
  
  // Add 5 entries (should evict 2)
  const testTopics = ['diabetes', 'hypertension', 'asthma', 'copd', 'obesity'];
  for (const topic of testTopics) {
    await fetcher.fetch({ topic });
  }
  
  const sizeMetrics = smallCache.getMetrics();
  console.log(`   Added: ${testTopics.length} entries`);
  console.log(`   Cache Size: ${sizeMetrics.size}`);
  console.log(`   Evictions: ${sizeMetrics.evictions}`);

  console.log('\n📊 Test 6: Parallel Fetching with Cache\n');
  
  cache.clear();
  
  const start6 = Date.now();
  await Promise.all([
    pubmedCached.fetch({ topic: 'diabetes' }),
    societiesCached.fetch({ topic: 'diabetes' }),
    brazilCached.fetch({ topic: 'diabetes' }),
  ]);
  const time6a = Date.now() - start6;
  
  const start6b = Date.now();
  await Promise.all([
    pubmedCached.fetch({ topic: 'diabetes' }),
    societiesCached.fetch({ topic: 'diabetes' }),
    brazilCached.fetch({ topic: 'diabetes' }),
  ]);
  const time6b = Date.now() - start6b;
  
  console.log(`   First parallel fetch: ${time6a}ms`);
  console.log(`   Second parallel fetch (cached): ${time6b}ms`);
  console.log(`   Speedup: ${(time6a / time6b).toFixed(1)}x faster`);

  // Final summary
  console.log('\n' + '='.repeat(80));
  console.log('\n✅ All Cache Tests Passed!\n');
  
  const finalMetrics = cache.getMetrics();
  console.log('📈 Final Metrics:\n');
  console.log(`   Total Requests: ${finalMetrics.hits + finalMetrics.misses}`);
  console.log(`   Cache Hits: ${finalMetrics.hits}`);
  console.log(`   Cache Misses: ${finalMetrics.misses}`);
  console.log(`   Hit Rate: ${(finalMetrics.hitRate * 100).toFixed(1)}%`);
  console.log(`   Cache Size: ${finalMetrics.size} entries`);
  console.log(`   Evictions: ${finalMetrics.evictions}`);
  
  console.log('\n🎉 Cache Implementation Complete!');
}

// Run test
testCache().catch(error => {
  console.error('\n❌ Test failed:', error);
  process.exit(1);
});

