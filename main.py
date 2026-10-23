#!/usr/bin/env python3
"""
MR AI - Personal AI Assistant
Entry point. Runs live job search by default.
"""

import asyncio
from agents.job_hunter import JobHunterAgent
from core.jarvis import MR_AI
from core.tasks import tracker


async def run_job_search(query: str = "Python developer"):
    agent = JobHunterAgent()
    print(agent.status())
    print("-" * 40)
    result = await agent.search(query=query, limit=10)

    print(f"Status  : {result['status']}")
    print(f"Query   : {result['query']}")
    print(f"Found   : {result['count']} jobs")
    print(f"Sources : {', '.join(result['sources'])}")
    if result.get("source_warnings"):
        print(f"Warnings: {result['source_warnings']}")
    print()

    for i, job in enumerate(result.get("results") or [], 1):
        print(f"{i}. {job['title']}")
        print(f"   Company  : {job['company']}")
        print(f"   Location : {job['location']}")
        print(f"   Source   : {job['source']}")
        print(f"   URL      : {job['url']}")
        print()

        # Auto-create a tracking task for each job found
        tracker.create(
            title=f"Review: {job['title'][:80]}",
            description=f"{job['company']} | {job['url']}",
            agent="job_hunter",
        )

    print("Note:", result.get("note"))
    print(f"\nTasks created for review: {len(tracker.list())}")
    return result


def main():
    print("MR AI online.")
    core = MR_AI()
    core.run()
    print("Running live search for Python developer remote jobs...\n")
    asyncio.run(run_job_search("Python developer"))


if __name__ == "__main__":
    main()
